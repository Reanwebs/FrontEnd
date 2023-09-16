import React, { useState } from "react";

import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";

export default function CommunityCard({communities}) {
  const [isFollowed, setIsFollowed] = React.useState(false);
   console.log(communities);

  return (
    <>
    {communities.map((community)=>
    <>
        <Card className="max-w-[340px]" key={community?.id}>
        <CardHeader className="justify-between">
          <div className="flex gap-5">
            <Avatar isBordered radius="full" name={community.communityName} size="md" 
                src={
                    community?.communityAvatar 
                    && `https://res.cloudinary.com/dcv6mx1nk/image/upload/v1693938021/${community?.communityAvatar}` 

                    }/>
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{community.communityName}</h4>
              <h5 className="text-small tracking-tight text-default-400">{community.communityDescription}</h5>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="gap-3">
          <div className="flex gap-1">
            <p className="font-semibold text-default-400 text-small">{community.memberCount}</p>
            <p className="text-default-400 text-small">Memebers</p>
          </div>
          <div className="">
          <Button
            className={isFollowed ? "bg-transparent text-foreground border-default-200" : ""}
            color="primary"
            radius="full"
            size="sm"
            variant={isFollowed ? "bordered" : "solid"}
            onPress={() => setIsFollowed(!isFollowed)}
          >
            {isFollowed ? "Join" : "Exit"}
          </Button>
          </div>
        </CardFooter>
      </Card>

      </>
    )}
    </>
  );
}
