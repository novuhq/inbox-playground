"use client";
import React, { useRef, useState, useEffect } from "react";
import { PickerIcon } from "./icons/Picker";
import useClickOutside from "../hooks/useClickOutside";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { FormControl, FormLabel, Box, Input } from "@chakra-ui/react";

function ColorPickerField({
  register,
  setValue,
  placeholder,
  name,
  label,
}: {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  placeholder: string;
  name: string;
  label: string;
}) {
  const [color, setColor] = useColor(placeholder);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useClickOutside([pickerRef], () => setOpenColorPicker(false));

  useEffect(() => {
    setValue(name, color.hex);
  }, [color, name, setValue]);

  const handleColorChange = (newColor: any) => {
    setColor(newColor);
    setValue(name, newColor.hex);
  };

  return (
    <FormControl position="relative">
      <FormLabel fontSize="sm" color="white" opacity={0.6}>
        {label}
      </FormLabel>
      <Box position="relative" ref={pickerRef}>
        <Input
          {...register(name)}
          placeholder={placeholder}
          value={color.hex}
          size="sm"
          readOnly
          onClick={() => setOpenColorPicker(!openColorPicker)}
          cursor="pointer"
        />

        <PickerIcon className="inset-y-2 right-3 absolute pointer-events-none" />

        {openColorPicker && (
          <Box position="absolute" top="100%" paddingTop="10px" zIndex={50} right={0}>
            <ColorPicker
              color={color}
              onChange={handleColorChange}
              hideInput={["rgb", "hsv"]}
              height={100}
            />
          </Box>
        )}
      </Box>
    </FormControl>
  );
}

export default ColorPickerField;
