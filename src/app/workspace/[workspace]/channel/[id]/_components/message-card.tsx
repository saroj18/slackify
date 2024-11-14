import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface MessageCardProps {
  senderName?: string;
  senderImage?: string;
  message?: string;
  align: string;
}

export default function MessageCard({
  senderName = "John Doe",
  senderImage = "/placeholder.svg?height=40&width=40",
  message = "Hello! This is a sample message.",
  align,
}: MessageCardProps) {
  return (
    <Card
      className={`w-full max-w-md ${
        align == "left" ? "self-start" : "self-end"
      } `}
    >
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10 border-2 border-primary">
            <AvatarImage src={senderImage} alt={senderName} />
            <AvatarFallback>
              {senderName
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-primary">{senderName}</p>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              {message}
            </p>
          </div>
        </div>
      </CardContent>
      <div
        className="h-1 bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden="true"
      ></div>
    </Card>
  );
}
