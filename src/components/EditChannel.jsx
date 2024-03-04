import React, { useState } from "react";
import { useChatContext, ChannelDelete } from "stream-chat-react";
import { message } from "antd";
import { UserList } from "./";
import { CloseCreateChannel } from "../assets";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (event) => {
    event.preventDefault();

    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="Channel Name"
        required
      />

      <p>Add Members</p>
    </div>
  );
};

const EditChannel = ({ setIsEditing }) => {
  const { channel,client } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    try {
      const nameChanged =
        channelName !== (channel.data.name || channel.data.id);

      if (nameChanged) {
        await channel.update(
          { name: channelName },
          { text: `Channel name changed to ${channelName}` }
        );
      }

      if (selectedUsers.length) {
        await channel.addMembers(selectedUsers);
      }

      setChannelName(null);
      setIsEditing(false);
      setSelectedUsers([]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
      message.error("Only admin can add members.");
    }
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        <p>Edit Channel</p>
        <CloseCreateChannel setIsEditing={setIsEditing} />
      </div>
      <ChannelNameInput
        channelName={channelName}
        setChannelName={setChannelName}
      />
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className="edit-channel__button-wrapper" onClick={updateChannel}>
        <p>Save Changes</p>
      </div>
    </div>
  );
};

export default EditChannel;
