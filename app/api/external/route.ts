
import { NextResponse } from "next/server";
import { json } from "stream/consumers";

// const EXTERNAL_API_URL = "https://jsonplacehoder.typicode.com/post"

export async function GET() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts")

        if (!response.ok) {
            return NextResponse.json({
                success: false,
                message: "Your request has been faild please try again!"
            })
        }

        const data = await response.json()

        if (response.ok) {
            return NextResponse.json({
                success: true,
                data: JSON.parse(JSON.stringify(data))

            })
        }


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: "internal server error",
            error,
        })
    }
} 