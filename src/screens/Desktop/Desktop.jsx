import {
  HeartIcon,
  MessageCircleIcon,
  MoreHorizontalIcon,
  Repeat2Icon,
  SendIcon,
  ShareIcon,
} from "lucide-react";
import React from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";

export const Desktop = () => {
  const commentPlaceholders = [
    { opacity: "opacity-100", width: "w-[319px]" },
    { opacity: "opacity-55", width: "w-[220px]" },
    { opacity: "opacity-[0.69]", width: "w-[319px]" },
    { opacity: "opacity-[0.69]", width: "w-[220px]" },
    { opacity: "opacity-[0.69]", width: "w-[319px]" },
    { opacity: "opacity-[0.69]", width: "w-[220px]" },
  ];

  return (
    <div
      className="bg-[#34495e] grid justify-items-center [align-items:start] w-screen min-h-screen translate-y-[-1rem] animate-fade-in opacity-0"
      data-model-id="37:70"
    >
      <div className="bg-[#34495e] w-full max-w-[1440px] min-h-[1024px] relative px-4">
        <div className="flex gap-8 pt-32 justify-center">
          {/* Main Post Card */}
          <Card className="w-[629px] h-[896px] bg-white border border-black shadow-[8px_8px_4px_#00000040] opacity-[0.67] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:200ms]">
            <CardContent className="p-0 relative h-full">
              {/* Main content area */}
              <div className="h-[529px] bg-white" />

              {/* Social interaction icons */}
              <div className="absolute right-4 top-[369px] flex flex-col gap-6">
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <HeartIcon className="w-[54px] h-[46px]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <Repeat2Icon className="w-[62px] h-[62px]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <ShareIcon className="w-[62px] h-[62px]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <MessageCircleIcon className="w-[62px] h-[62px]" />
                </Button>
                <Button variant="ghost" size="icon" className="h-auto p-2">
                  <MoreHorizontalIcon className="w-[63px] h-[63px]" />
                </Button>
              </div>

              {/* ShareIcon overlay */}
              <img
                className="absolute w-[609px] h-[367px] top-[529px] left-0"
                alt="Bitcoin icons share"
                src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/bitcoin-icons-share-outline.svg"
              />

              {/* Footer section */}
              <div className="absolute bottom-0 left-0 right-0 h-[91px] bg-white opacity-[0.79] p-4">
                <div className="w-[319px] h-6 bg-[#34495e] opacity-[0.69] mb-4" />
                <div className="w-[220px] h-6 bg-[#34495e] rounded-[20px] opacity-[0.69]" />
              </div>
            </CardContent>
          </Card>

          {/* Comments Panel */}
          <Card className="w-[411px] h-[862px] bg-white border border-black shadow-[8px_8px_4px_#00000040] opacity-[0.71] translate-y-[-1rem] animate-fade-up opacity-0 [--animation-delay:400ms]">
            <CardContent className="p-0 relative h-full">
              <div className="p-7">
                <h2 className="[font-family:'Montserrat',Helvetica] font-normal text-black text-2xl tracking-[0] leading-[normal] mb-8">
                  Comments
                </h2>

                {/* Comment placeholders */}
                <div className="space-y-8">
                  {commentPlaceholders.map((comment, index) => (
                    <div key={index} className="space-y-4">
                      <div
                        className={`${comment.width} h-6 bg-[#34495e] ${comment.opacity}`}
                      />
                      <div
                        className={`${comment.width === "w-[319px]" ? "w-[220px]" : "w-[319px]"} h-6 bg-[#34495e] rounded-[20px] ${comment.opacity}`}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <div className="absolute bottom-[60px] left-[19px] right-[19px]">
                <div className="relative">
                  <Input
                    placeholder="Add a comment"
                    className="w-full h-[61px] bg-[#34495e] rounded-xl border-0 text-white placeholder:text-white placeholder:opacity-75 [font-family:'Montserrat',Helvetica] font-normal text-base pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-3 top-1/2 -translate-y-1/2 h-auto p-1"
                  >
                    <SendIcon className="w-[22px] h-[22px] text-white" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
