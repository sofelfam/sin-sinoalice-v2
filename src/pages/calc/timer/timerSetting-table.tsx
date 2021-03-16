import React, { useEffect, useState } from "react";
import 'twin.macro';
import { AnyImage } from "src/components";
import { Trash } from "src/components/icons";
import NightmareTabs from "./nightmare-tabs";

interface timerSettingTableProps {
  triggers: Set<string>;
  setTriggers:  React.Dispatch<React.SetStateAction<Set<string>>>;
  optButtonDisabled: boolean;
  startButtonDisabled: boolean;
  handleShinmaButton: () => void;
  handleStartButton: () => void;
  handleRestartButton: () => void;
  handleShorteningButton: () => void;
  handleMinusButton: () => void;
  handleClearButton: () => void;
  handleNightmareButton: (e: React.MouseEvent<HTMLElement>) => void;
};

const TimerSettingTable = (props: timerSettingTableProps) => {
  const { triggers, setTriggers, optButtonDisabled, startButtonDisabled, handleShinmaButton, handleStartButton, handleRestartButton, handleShorteningButton, handleMinusButton, handleClearButton, handleNightmareButton } = props;

  //ボタントリガーアラート
  interface SnackbarMessage {
    message: string;
    severity: "success" | "info" | "warning" | "error" | undefined;
    key: number;
  }
  
  const [snackPack, setSnackPack] = useState<SnackbarMessage[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [messageInfo, setMessageInfo] = useState<SnackbarMessage | undefined>(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      // Set a new snack when we don't have an active one
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setSnackbarOpen(true);
    } else if (snackPack.length && messageInfo && snackbarOpen) {
      // Close an active snack when a new one is added
      setSnackbarOpen(false);
    }
  }, [snackPack, messageInfo, snackbarOpen]);

  const handleSnackbarOpen = (message: string, severity: "success" | "info" | "warning" | "error" | undefined) => {
    //setSnackbarOpen(true);
    setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);
  }

  const handleSnackbarClose = (reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  const handleToggleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSet = new Set(triggers);
    if (newSet.has(e.target.value)) {
      newSet.delete(e.target.value);
    } else {
      newSet.add(e.target.value);
    }
    setTriggers(newSet);
  }

  const toggleCheck = (value: string):boolean => {
    return (triggers || new Set()).has(value);
  }

  const handleShinmaButtonWithSnack = () => {
    handleShinmaButton();
    handleSnackbarOpen("神魔効果タイマー開始。", "info");
  }

  const handleRestartButtonWithSnack = () => {
    handleRestartButton();
    handleSnackbarOpen("[逆刻] 起動メア巻き戻し。", "info");
  }

  const handleShorteningButtonWithSnack = () => {
    handleShorteningButton();
    handleSnackbarOpen("[順刻] 起動メア60秒減少。", "info");
  }

  const handleMinusButtonWithSnack = () => {
    handleMinusButton();
    handleSnackbarOpen("-1秒しました。", "success");
  }

  const handleClearButtonWithSnack = () => {
    handleClearButton();
    handleSnackbarOpen("クリアしました。", "success");
  }

  return(
    <div tw='p-2'>
      <h6 tw='dark:text-white'>タイマー設定</h6>
      <div>
        <div tw='flex flex-row justify-between items-center px-4 lg:px-20'>
          <div tw='flex flex-col m-1'>
            <div tw='inline-flex flex-row mb-1'>
              <div tw='relative h-16 rounded-l-md overflow-hidden'>
                <input
                  type='checkbox'
                  id='trigger-5s'
                  value='5s'
                  tw='w-16 h-16 box-border appearance-none cursor-pointer transition ease focus:outline-none focus-visible:ring border border-gray-400
                    hover:bg-focus checked:bg-disabled dark:checked:bg-darkhover
                    rounded-l-md'
                  onChange={(e) => handleToggleChange(e)}
                  checked={toggleCheck('5s')}
                />
                <div tw='absolute left-0 top-0 w-full h-full -z-1'>
                  <AnyImage filename='cards/CardS5975.png' />
                </div>
              </div>
              <div tw='relative h-16 rounded-r-md overflow-hidden'>
                <input
                  type='checkbox'
                  id='trigger-90s'
                  value='90s'
                  tw='w-16 h-16 box-border appearance-none cursor-pointer transition ease focus:outline-none focus-visible:ring border border-gray-400
                    hover:bg-focus checked:bg-disabled dark:checked:bg-darkhover
                    rounded-r-md border-l-0'
                  onChange={(e) => handleToggleChange(e)}
                  checked={toggleCheck('90s')}
                />
                <div tw='absolute left-0 top-0 w-full h-full -z-1'>
                  <AnyImage filename='cards/CardS7549.png' />
                </div>
              </div>
            </div>
            <div tw='inline-flex'>
              <label
                htmlFor='trigger-5s'
                tw='w-16 text-sm text-center cursor-pointer overflow-hidden'
              >
                3rdユノ
              </label>
              <label
                htmlFor='trigger-90s'
                tw='w-16 text-sm text-center cursor-pointer overflow-hidden'
              >
                サルト
              </label>
            </div>
          </div>
          <div>
            <button
              tw='text-2xl bg-blue-600 text-white rounded-lg py-2 px-4 transition ease select-none hover:bg-blue-800 disabled:bg-gray-400 focus:outline-none focus-visible:ring'
              onClick={() => handleShinmaButtonWithSnack()}
            >
              神魔効果開始
            </button>
          </div>
        </div>
        <div tw='w-full px-2'>
          <button
            tw='w-full text-4xl bg-lightblue-500 text-white rounded-2xl p-6 transition ease select-none hover:bg-lightblue-700 disabled:bg-gray-400 focus:outline-none focus-visible:ring'
            onClick={() => handleStartButton()}
            disabled={startButtonDisabled}
          >
            ナイトメア準備
          </button>
        </div>
        <div>
          <div tw='flex justify-between p-2 lg:px-16'>
            <div tw='flex'>
              <div tw='flex flex-col'>
                <button
                  tw='relative w-16 h-16 items-center rounded-full p-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-focus active:bg-active disabled:bg-disabled focus:outline-none focus-visible:ring overflow-hidden'
                  id='res-restart'
                  onClick={() => handleRestartButtonWithSnack()}
                  disabled={optButtonDisabled}
                >
                  <div tw='absolute -top-2 -left-2 w-20 h-20 -z-1'>
                    <AnyImage filename='cards/CardS6416.png' />
                  </div>
                </button>
                <label
                  htmlFor='res-restart'
                  tw='w-full text-sm text-center cursor-pointer overflow-hidden'
                >
                  ロボンゴ
                </label>
              </div>
              <div tw='flex flex-col'>
                <button
                  tw='relative w-16 h-16 items-center rounded-full p-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-focus active:bg-active disabled:bg-disabled focus:outline-none focus-visible:ring overflow-hidden'
                  id='res-shortening'
                  onClick={() => handleShorteningButtonWithSnack()}
                  disabled={optButtonDisabled}
                >
                  <div tw='absolute -top-2 -left-2 w-20 h-20 -z-1'>
                    <AnyImage filename='cards/CardS2672.png' />
                  </div>
                </button>
                <label
                  htmlFor='res-shortening'
                  tw='w-full text-sm text-center cursor-pointer overflow-hidden'
                >
                  ガリア
                </label>
              </div>
              <div tw='flex flex-col'>
                <button
                  tw='w-16 h-16 items-center bg-emerald-500 text-white rounded-full px-2 py-1 sm:px-4 sm:py-2 ml-1 sm:m-2 transition ease select-none hover:bg-emerald-700 disabled:bg-gray-400 focus:outline-none focus-visible:ring'
                  id='res-minus'
                  onClick={() => handleMinusButtonWithSnack()}
                  disabled={optButtonDisabled}
                >
                  <span tw='block text-center'>-1</span>
                </button>
                <label
                  htmlFor='res-minus'
                  tw='w-full text-sm text-center cursor-pointer overflow-hidden'
                >
                  微調整
                </label>
              </div>
            </div>
            <button
              tw='flex h-16 items-center bg-rose-600 text-white rounded-md px-4 py-1 sm:px-4 sm:py-2 sm:m-2 transition ease select-none hover:bg-rose-800 focus:outline-none focus-visible:ring'
              onClick={() => handleClearButtonWithSnack()}
            >
              <Trash />
              <span tw='sm:block hidden'>クリア</span>
            </button>
          </div>
        </div>
        <div>
          <NightmareTabs handleNightmareButton={handleNightmareButton} />
        </div>
      </div>
    </div>
  )
};
  
export default TimerSettingTable;
