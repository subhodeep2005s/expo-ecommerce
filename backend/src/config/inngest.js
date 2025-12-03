import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

// Inngest client
export const inngest = new Inngest({ id: "ecommerce-app" });

/**
 * When using the generic Webhook Integration, your transform is:
 *   name: `webhook-integration/${evt.type || evt.name || ...}`
 *   data: evt.data || evt
 *
 * So:
 *   - event.name  => "webhook-integration/user.created"
 *   - event.data  => the Clerk "data" object (user fields directly on it)
 */

const syncUser = inngest.createFunction(
  { id: "sync-user", name: "Sync Clerk user to MongoDB" },
  { event: "webhook-integration/user.created" }, // 👈 match transform name
  async ({ event, logger }) => {
    await connectDB();

    // Clerk user fields are directly on event.data because of your transform
    const {
      id,
      email_addresses = [],
      first_name,
      last_name,
      image_url,
    } = event.data;

    if (!id) {
      logger?.error("No user id in event.data", { eventData: event.data });
      return;
    }

    if (email_addresses.length === 0) {
      logger?.error("No email_addresses in event.data", {
        eventData: event.data,
      });
      return;
    }

    const email = email_addresses[0].email_address;

    const newUser = {
      clerkId: id,
      email,
      name: `${first_name || ""} ${last_name || ""}`.trim() || "User",
      imageUrl: image_url ?? "",
      addresses: [],
      wishlist: [],
    };

    // upsert so repeated events don't crash on unique constraints
    const created = await User.findOneAndUpdate({ clerkId: id }, newUser, {
      upsert: true,
      new: true,
    });

    logger?.info("User synced to MongoDB", { _id: created._id, clerkId: id });
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db", name: "Delete Clerk user from MongoDB" },
  { event: "webhook-integration/user.deleted" }, // 👈 match transform name
  async ({ event, logger }) => {
    await connectDB();

    const { id } = event.data;

    if (!id) {
      logger?.error("No user id in delete event", { eventData: event.data });
      return;
    }

    await User.deleteOne({ clerkId: id });
    logger?.info("User deleted from MongoDB", { clerkId: id });
  }
);

export const functions = [syncUser, deleteUserFromDB];
