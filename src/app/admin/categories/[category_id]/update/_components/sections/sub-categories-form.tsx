
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TooltipWrapper } from "@/components/wrappers/tooltip-wrapper";
import { useAppDispatch } from "@/hooks/redux";
import { cn } from "@/lib/utils";
import { getPublicId } from "@/utils/format";
import { Info, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import ImageForm from "../image-form";

export default function SubCategoriesForm({
  setSubCateValues,
  subCateValues,
  setCategoriesIdsForDeleteFromCloudinary,
}: {
  setCategoriesIdsForDeleteFromCloudinary: Dispatch<SetStateAction<string[]>>;
  setSubCateValues: Dispatch<SetStateAction<{ image: string; name: string }[]>>;
  subCateValues: { name: string; image: string }[];
}) {
  const [errorMessages, setErrorMessages] = useState<boolean[]>([]);

  const updateErrorMessages = (idx: number, isValidValue: boolean) => {
    setErrorMessages((prevMessages) => {
      const newMessages = [...prevMessages];
      newMessages[idx] = !isValidValue;
      return newMessages;
    });
  };
  const cateIsValid = (val: string): boolean => /^[A-Za-z\s]{2,50}$/.test(val);
  const dispatch = useAppDispatch();

  const handleChange = ({
    value,
    name,
    idx,
  }: {
    name: string;
    value: string | ArrayBuffer | null;
    idx: number;
  }) => {
    setSubCateValues((curr) => {
      const newArr = [...curr];
      newArr[idx] = { ...newArr[idx], [name]: value };
      if (
        idx === newArr.length - 1 &&
        cateIsValid(newArr[idx].name) &&
        newArr[idx].image
      ) {
        newArr.push({ name: "", image: "" });
      }
      updateErrorMessages(idx, cateIsValid(newArr[idx].name));
      return newArr;
    });
  };

  const readerImage = (image: File, idx: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const id = getPublicId(subCateValues?.[idx]?.image);
      if (id) setCategoriesIdsForDeleteFromCloudinary((curr) => [...curr, id]);
      handleChange({
        value: reader.result,
        name: "image",
        idx,
      });
    };
    reader.readAsDataURL(image);
  };

  const onDelete = (idx: number) => {
    if (subCateValues?.length > 1) {
      const id = getPublicId(subCateValues?.[idx]?.image);
      if (id) setCategoriesIdsForDeleteFromCloudinary((curr) => [...curr, id]);
      idx >= 0 && setSubCateValues((curr) => curr.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="mt-10 ">
      <Label
        className={
          "text-shade flex items-center justify-between w-full gap-2  capitalize "
        }
      >
        <div className="flex items-center gap-2 text-slate-800 mb-4">
          Sub Categories *
          <TooltipWrapper
            side={"top"}
            label={"Repeats and fields not completed will be excluded"}
          >
            <Info className="h-3 w-3 text-shade" />
          </TooltipWrapper>
        </div>
        <span className="mr-2">( {subCateValues?.length - 1} )</span>
      </Label>
      <div className="rounded-sm p-4 border">
        {subCateValues?.map((el, i) => (
          <div key={i} className="flex items-center gap-3 w-full ">
            <ImageForm
              id={i}
              readerImage={readerImage}
              imageValue={subCateValues[i].image}
            />
            <div className="flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 w-full">
                <Input
                  name={"sub_categories"}
                  value={el.name}
                  placeholder={"Sub category"}
                  type={"text"}
                  minLength={2}
                  maxLength={50}
                  onChange={(e) =>
                    handleChange({
                      name: "name",
                      value: e.target.value,
                      idx: i,
                    })
                  }
                  className={"rounded-sm py-5 w-full"}
                />
                <Trash2
                  className={cn("h-5 w-5 text-shade hover:text-red-700", {
                    hidden: subCateValues?.length === 1,
                  })}
                  onClick={() => onDelete(i)}
                />
              </div>
              {errorMessages[i] && (
                <span className="text-red-700 mt-1 text-[11px]">
                  Field must be 2-50 characters long, containing only English
                  letters.
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
