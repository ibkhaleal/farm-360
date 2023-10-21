import { NextResponse } from "next/server";

import { currentUser } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    const profile = await currentUser();

    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const data = {
        name: `${profile.firstName} ${profile.lastName}`,
        mobile: profile.phoneNumbers[0],
        email: profile.emailAddresses[0],
        image: profile.imageUrl,
        type: 1
    }

    return NextResponse.json(data);
  } catch (err) {
    console.log("[INITIAL_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
