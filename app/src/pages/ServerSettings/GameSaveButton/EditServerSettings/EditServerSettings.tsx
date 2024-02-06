import {
  AlertDialog,
  Button,
  ContextMenu,
  Flex,
  TextFieldInput,
} from "@radix-ui/themes";
import React, { useState } from "react";
import useGameSave from "../../../../hooks/useGameSave";
import { ipcRenderer } from "../../../../constant/contextBridge";
import useSelectedGameSave from "../../../../redux/selectGameSave/useSelectedGameSave";

export default function EditServerSettings(props: { saveId: string }) {
  const { setSelectedGameSave } = useSelectedGameSave();

  const gameSave = useGameSave(props.saveId);
  const gameSaveServerName = gameSave?.settings?.ServerName?.slice(1, -1);
  const gameSavePublicIP = gameSave?.settings?.PublicIP?.slice(1, -1);
  const gameSavePublicPort = gameSave?.settings?.PublicPort;

  const [serverName, setServerName] = useState("");
  const [publicIP, setPublicIP] = useState("");
  const [publicPort, setPublicPort] = useState("");

  const handleEditGameSave = () => {
    ipcRenderer.send(
      "request-set-save",
      props.saveId,
      {
        settings: {
          ServerName: `"${serverName ? serverName : gameSaveServerName}"`,
          PublicIP: `"${publicIP ? publicIP : gameSavePublicIP}"`,
        },
      },
      "a"
    );
    setServerName("");
    setPublicIP("");
    setSelectedGameSave(props.saveId);
  };

  return (
    <AlertDialog.Content style={{ maxWidth: 450 }}>
      <AlertDialog.Title>編輯伺服器</AlertDialog.Title>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>伺服器名稱：</span>
        <TextFieldInput
          placeholder={gameSaveServerName}
          value={serverName}
          onChange={(e) => {
            setServerName(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>公開 IP：</span>
        <TextFieldInput
          placeholder={gameSavePublicIP}
          value={publicIP}
          onChange={(e) => {
            setPublicIP(e.target.value);
          }}
        />
      </div>

      <div className="w-[70%] my-2 flex gap-2 items-center justify-between">
        <span>端口號：</span>
        <TextFieldInput
          placeholder={gameSavePublicPort}
          value={publicPort}
          onChange={(e) => {
            setPublicPort(e.target.value);
          }}
        />
      </div>

      <Flex gap="3" mt="4" justify="end">
        <AlertDialog.Cancel>
          <Button variant="soft" color="gray">
            取消
          </Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button variant="solid" onClick={handleEditGameSave}>
            確認修改
          </Button>
        </AlertDialog.Action>
      </Flex>
    </AlertDialog.Content>
  );
}
