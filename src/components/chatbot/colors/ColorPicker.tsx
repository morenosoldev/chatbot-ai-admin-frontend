import { SketchPicker } from 'react-color';

interface ColorPickerProps {
  showUserMessagePicker: boolean;
  setShowUserMessagePicker: React.Dispatch<React.SetStateAction<boolean>>;
  userMessageColor: string;
  setUserMessageColor: React.Dispatch<React.SetStateAction<string>>;
  showBotMessagePicker: boolean;
  setShowBotMessagePicker: React.Dispatch<React.SetStateAction<boolean>>;
  botMessageColor: string;
  setBotMessageColor: React.Dispatch<React.SetStateAction<string>>;
  showUserTextColorPicker: boolean;
  setShowUserTextColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
  userTextColor: string;
  setUserTextColor: React.Dispatch<React.SetStateAction<string>>;
  showBotTextColorPicker: boolean;
  setShowBotTextColorPicker: React.Dispatch<React.SetStateAction<boolean>>;
  botTextColor: string;
  setBotTextColor: React.Dispatch<React.SetStateAction<string>>;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  showUserMessagePicker,
  setShowUserMessagePicker,
  userMessageColor,
  setUserMessageColor,
  showBotMessagePicker,
  setShowBotMessagePicker,
  botMessageColor,
  setBotMessageColor,
  showUserTextColorPicker,
  setShowUserTextColorPicker,
  userTextColor,
  setUserTextColor,
  showBotTextColorPicker,
  setShowBotTextColorPicker,
  botTextColor,
  setBotTextColor,
}) => {
  const handleCloseUserMessagePicker = () => {
    setShowUserMessagePicker(false);
  };

  const handleOpenUserMessagePicker = () => {
    setShowUserMessagePicker(true);
  };

  const handleCloseBotMessagePicker = () => {
    setShowBotMessagePicker(false);
  };

  const handleOpenBotMessagePicker = () => {
    setShowBotMessagePicker(true);
  };

  const handleCloseUserTextColorPicker = () => {
    setShowUserTextColorPicker(false);
  };

  const handleOpenUserTextColorPicker = () => {
    setShowUserTextColorPicker(true);
  };

  const handleCloseBotTextColorPicker = () => {
    setShowBotTextColorPicker(false);
  };

  const handleOpenBotTextColorPicker = () => {
    setShowBotTextColorPicker(true);
  };

  return (
    <div className="colors gap-y-0 grid grid-cols-2 h-[200px]">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bruger besked baggrund</h2>
        <div>
          <div
            className="p-2 bg-white shadow pointer"
            onClick={handleOpenUserMessagePicker}
            data-testid="userMessagePicker" // Added data-testid
          >
            <div
              className="w-full h-10"
              style={{ backgroundColor: userMessageColor }}
            />
          </div>
          {showUserMessagePicker ? (
            <div className="absolute z-10">
              <div
                className="fixed left-0 top-0 right-0 bottom-0"
                data-testid="closeUserMessagePicker"
                onClick={handleCloseUserMessagePicker}
              />
              <SketchPicker
                color={userMessageColor}
                onChange={(color: any) => {
                  setUserMessageColor(color.hex);
                }}
                data-testid="userMessageColorPicker" // Added data-testid
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bot besked baggrund</h2>
        <div>
          <div
            className="p-2 bg-white shadow pointer"
            onClick={handleOpenBotMessagePicker}
            data-testid="botMessagePicker" // Added data-testid
          >
            <div
              className="w-full h-10"
              style={{ backgroundColor: botMessageColor }}
            />
          </div>
          {showBotMessagePicker ? (
            <div className="absolute z-10">
              <div
                className="fixed left-0 top-0 right-0 bottom-0"
                data-testid="closeBotMessagePicker"
                onClick={handleCloseBotMessagePicker}
              />
              <SketchPicker
                color={botMessageColor}
                onChange={(color: any) => {
                  setBotMessageColor(color.hex);
                }}
                data-testid="botMessageColorPicker" // Added data-testid
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Bruger tekst farve</h2>
        <div>
          <div
            className="p-2 bg-white shadow pointer"
            onClick={handleOpenUserTextColorPicker}
            data-testid="userTextColorPicker" // Added data-testid
          >
            <div
              className="w-full h-10"
              style={{ backgroundColor: userTextColor }}
            />
          </div>
          {showUserTextColorPicker ? (
            <div className="absolute z-10">
              <div
                className="fixed left-0 top-0 right-0 bottom-0"
                data-testid="closeUserTextColorPicker"
                onClick={handleCloseUserTextColorPicker}
              />
              <SketchPicker
                color={userTextColor}
                onChange={(color: any) => {
                  setUserTextColor(color.hex);
                }}
                data-testid="userTextColorColorPicker" // Added data-testid
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className="mb-4 ml-5">
        <h2 className="text-lg font-semibold">Bot tekst farve</h2>
        <div>
          <div
            className="p-2 bg-white shadow pointer"
            onClick={handleOpenBotTextColorPicker}
            data-testid="botTextColorPicker" // Added data-testid
          >
            <div
              className="w-full h-10"
              style={{ backgroundColor: botTextColor }}
            />
          </div>
          {showBotTextColorPicker ? (
            <div className="absolute z-10">
              <div
                className="fixed left-0 top-0 right-0 bottom-0"
                data-testid="closeBotTextColorPicker"
                onClick={handleCloseBotTextColorPicker}
              />
              <SketchPicker
                color={botTextColor}
                onChange={(color: any) => {
                  setBotTextColor(color.hex);
                }}
                data-testid="botTextColorColorPicker" // Added data-testid
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
