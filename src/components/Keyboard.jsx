import { DeleteIcon } from "lucide-react";
import Keycap from "./Keycap";

const Keyboard = ({ handleKeyPress, handleRemoveLetter }) => {
  const keyCapFirstRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keyCapSecondRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keyCapThirdRow = ["Z", "X", "C", "V", "B", "N", "M"];

  return (
    <div className="max-w-2xl mx-auto w-full flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {keyCapFirstRow.map((letter) => (
          <Keycap
            key={letter}
            letter={letter}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </div>
      <div className="flex items-center gap-2">
        {keyCapSecondRow.map((letter) => (
          <Keycap
            key={letter}
            letter={letter}
            handleKeyPress={handleKeyPress}
          />
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Keycap letter="ENTER" handleKeyPress={handleKeyPress} />
        {keyCapThirdRow.map((letter) => (
          <Keycap
            key={letter}
            letter={letter}
            handleKeyPress={handleKeyPress}
          />
        ))}
        <Keycap
          letter="BACKSPACE"
          icon={<DeleteIcon className="w-7 h-7" />}
          handleKeyPress={handleKeyPress}
          className="px-8"
        />
      </div>
    </div>
  );
};

export default Keyboard;
