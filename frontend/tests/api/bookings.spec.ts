import { describe, it, expect, vi, afterEach } from "vitest";
import { createBooking } from "@/api/bookings";

afterEach(() => {
  vi.unstubAllGlobals();
});

const payload = {
  meeting_type_id: "abc123",
  guest_name: "John",
  start_time: "2026-06-15T10:00:00",
};

const mockBooking = {
  id: "b1",
  guest_name: "John",
  start_time: "2026-06-15T10:00:00",
  end_time: "2026-06-15T10:30:00",
  created_at: "2026-06-13T12:00:00",
  meeting_type: {
    id: "abc123",
    name: "Consultation",
    description: "30 min meeting",
    duration_minutes: 30,
  },
};

describe("createBooking", () => {
  it("calls POST /api/v1/bookings with the request body", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      json: () => Promise.resolve({ type: "success", data: mockBooking }),
    });
    vi.stubGlobal("fetch", mockFetch);

    await createBooking(payload);

    expect(mockFetch).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledWith("/api/v1/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  });

  it("returns booking on success", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () => Promise.resolve({ type: "success", data: mockBooking }),
      })
    );

    const result = await createBooking(payload);

    expect(result.type).toBe("success");
    if (result.type === "success") {
      expect(result.data).toEqual(mockBooking);
    }
  });

  it("returns error on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            type: "failure",
            error: "Slot is already taken",
            code: "SLOT_TAKEN",
          }),
      })
    );

    const result = await createBooking(payload);

    expect(result.type).toBe("failure");
    if (result.type === "failure") {
      expect(result.code).toBe("SLOT_TAKEN");
    }
  });
});
