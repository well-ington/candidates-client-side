import React from "react";
import styles from "./search-suggestion.scss";

interface ISuggestion {
  value: string;
  options: string[] | number[];
  change: (value: string) => void;
  testid?: string;
}

const filterQuery = (str: string) =>
  str
    .toLowerCase()
    .replace(/à|á|ã|â/g, "a")
    .replace(/è|ê|ê|é/g, "e")
    .replace(/(ì|í|î)/g, "i")
    .replace(/ò|ó|ô|ö/g, "o")
    .replace(/ù|ú|û|ü/g, "u")
    .replace(/ç/g, "c");

export const SearchSuggestion: React.FC<ISuggestion> = ({
  value,
  options,
  change,
  testid = "test-suggestions",
}) => {
  const [selected, setSelected] = React.useState(0);

  let optionsArray: string[] = [...options].map((e: string) => `${e}`);
  let isNumber = !Number.isNaN(Number(options[0]));

  let filteredItems = [];

  if (isNumber) {
    let newArr = [...options].map((item: number) =>
      item - Math.floor(item) === 0.5 ? item : Math.floor(item)
    );

    newArr.sort((a, b) => (a > b ? 1 : -1));
    let oldLength = newArr.length;
    const emptyArray = [];

    for (let i = 0; i <= newArr[newArr.length - 1]; i++) {
      if (newArr.indexOf(i) === -1) {
        newArr.push(i);
      }
    }
    if (oldLength !== newArr.length) {
      newArr.sort((a, b) => (a > b ? 1 : -1));
    }

    let biggestNumber = 0;

    newArr.forEach((item: number) => {
      const flooredNumber = Math.floor(item);
      biggestNumber = Math.max(biggestNumber, item);
      if (flooredNumber !== item) {
        const anotherNumber = item - flooredNumber;
        if (anotherNumber == 0.5) {
          emptyArray.push(`de ${flooredNumber} a ${flooredNumber + 1} anos`);
        } else {
          emptyArray.push(`mais de ${Math.floor(item)} anos`);
        }
      } else {
        emptyArray.push(`mais de ${Math.floor(item)} anos`);
      }
    });

    optionsArray = emptyArray;
    const twoNumbersRegex = new RegExp(/(\d+)(.+?)(\d+)/);
    let valueToCompare = [value];
    let isDualRegex = false;

    if (twoNumbersRegex.test(value)) {
      isDualRegex = true;
      valueToCompare = [...value.replace(twoNumbersRegex, "$1 $3").split(" ")];
    } else {
      valueToCompare = [value.replace(/(\d+)/, "-$2-").split("-")[1]];
    }

    filteredItems = optionsArray.filter((item: string) => {
      if (isDualRegex) {
        return (
          item.toLowerCase().search(valueToCompare[0].toLowerCase()) !== -1 &&
          item.toLowerCase().search(valueToCompare[1].toLowerCase()) !== -1
        );
      } else {
        return (
          item.toLowerCase().search(valueToCompare[0].toLowerCase()) !== -1
        );
      }
    });
  } else {
    filteredItems = optionsArray.filter(
      (item: string) => filterQuery(item).search(filterQuery(value)) !== -1
    );
  }

  if (selected > filteredItems.length - 1 || selected >= 8) {
    setSelected(-1);
  }

  React.useEffect(() => {
    let lastTime = Date.now();
    const captureKeys = (e) => {
      const now = Date.now();
      if (now - lastTime > 128) {
        switch (e.keyCode) {
          case 38:
            if (selected > 0) {
              setSelected(selected - 1);
            } else {
              setSelected(Math.min(8, filteredItems.length - 1));
            }
            break;
          case 40:
            if (selected < 8) {
              setSelected(selected + 1);
            }
            break;
          case 13:
            if (filteredItems[Number(selected)]) {
              change(filteredItems[Number(selected)]);
            }
            break;
        }
      }
    };

    window.addEventListener("keydown", captureKeys);

    return () => {
      window.removeEventListener("keydown", captureKeys);
    };
  }, [selected, setSelected, filteredItems]);

  return (
    <div data-testid={testid} className={styles.container}>
      {filteredItems.length > 0 && value.length > 0 ? (
        <p>clique ou selecione a opção e aperte Enter</p>
      ) : (
        ""
      )}
      {filteredItems.length > 0 &&
        value.length > 0 &&
        filteredItems
          .slice(0, filteredItems.length > 8 ? 8 : filteredItems.length)
          .map((suggestion, id) => {
            return (
              <p
                data-testid={`suggestion-${id}`}
                onClick={() => change(suggestion)}
                key={`suggestion-id-${id}`}
                className={`${styles.item} ${
                  selected === id ? styles.itemActive : ""
                }`}
              >
                {suggestion}
              </p>
            );
          })}
    </div>
  );
};
