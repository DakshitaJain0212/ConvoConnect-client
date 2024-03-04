import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext();
  console.log(channel?.data?.imageUrl);
  const ChannelPreview = () => (
      <>
        <span
          className="auth__form-container_fields-content_file_image"
          style={{ marginRight: "30px"}}
        >
          <div className="auth__form-container_fields-content_file_figure">
            <img
              src={channel?.data?.imageUrl}
              alt="image"
              style={{
                width: "100%",
                borderRadius: "50%",
              }}
            />
          </div>
        </span>
        <p className="channel-preview__item" >
          {channel?.data?.name || channel?.data?.id}
        </p>
        </>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    console.log(members[0]);

    return (
      <>
      <div className="channel-preview__item-chats single">
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={60}
        />
        <p style={{color: "#fff"}}>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
      </>
    );
  };

  return (
    <>
      {type === "team" ? (
        <div className="channel-perview__wrapper-container">
          <div
            className="channel-preview__wrapper"
            onClick={() => {
              setIsCreating(false);
              setIsEditing(false);
              setActiveChannel(channel);
              if (setToggleContainer) {
                setToggleContainer((prevState) => !prevState);
              }
            }}
          >
            <ChannelPreview />
            {/* {type === 'team' ? : <DirectPreview />} */}
          </div>
        </div>
      ) : (
        <div
        className={
          channel?.id === activeChannel?.id
              ? 'channel-preview__wrapper__selected'
              : 'channel-preview__wrapper-message'
      }
          onClick={() => {
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);
            if (setToggleContainer) {
              setToggleContainer((prevState) => !prevState);
            }
          }}
        >
          <DirectPreview />
          {/* {type === 'team' ? <ChannelPreview /> : } */}
        </div>
      )}
    </>
  );
};

export default TeamChannelPreview;
