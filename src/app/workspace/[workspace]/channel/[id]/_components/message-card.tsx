import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DOMPurify from "dompurify";

interface MessageCardProps {
  senderName?: string;
  senderImage?: string;
  message?: string;
  align: string;
  time: string;
}

export default function MessageCard({
  senderName = "John Doe",
  senderImage = "/placeholder.svg?height=40&width=40",
  message = "Hello! This is a sample message.",
  align,
  time,
}: MessageCardProps) {
  const sanitizedHtml = DOMPurify.sanitize(message);
  return (
    <Card
      title={new Date(time).toLocaleTimeString()}
      className={`w-full max-w-md ${
        align == "left" ? "self-start" : "self-end"
      } `}
    >
      <CardContent className="p-3">
        <div className="flex items-start space-x-4">
          <Avatar className="w-12 h-12 ">
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
            <p
              dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
              className="mt-1 text-sm text-gray-600 dark:text-gray-300"
            ></p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
