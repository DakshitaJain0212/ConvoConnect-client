import React, {useState} from "react";
import { Channel, useChatContext, MessageTeam } from "stream-chat-react";
import { ChannelInner, CreateChannel, EditChannel } from "./";


const ChannelContainer = ({
  isCreating,
  setIsCreating,
  isEditing,
  setIsEditing,
  createType,
}) => {

  const [ theme , setTheme ] = useState("white");
  const { channel } = useChatContext();
  if (isCreating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setIsCreating={setIsCreating} />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="channel__container">
        <EditChannel setIsEditing={setIsEditing} setTheme={setTheme}/>
      </div>
    );
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">
        This is the beginning of your chat history.
      </p>
      <p className="channel-empty__second">
        Send messages, attachments, links, emojis, and more!
      </p>
    </div>
  );

  return (
    <>
      <div className="channel__container" style={{background: theme}}>
        <Channel
          EmptyStateIndicator={EmptyState}
          Message={(messageProps, i) => (
            <MessageTeam
              key={i}
             {...messageProps}
             />
          )}
        >
          <ChannelInner setIsEditing={setIsEditing} />
        </Channel>
      </div>
    </>
  );
};

export default ChannelContainer;
