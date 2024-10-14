"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import { Select, OptionBase } from "chakra-react-select";
import {
  VStack,
  Text,
  FormControl,
  FormLabel,
  Switch,
  SimpleGrid,
  Input,
  Box,
  Flex,
} from "@chakra-ui/react";
import { PickerIcon } from "./icons/Picker";
import useClickOutside from "../hooks/useClickOutside";
import { UseFormRegister, UseFormSetValue, Controller } from "react-hook-form";

const items = [
  {
    label: "Primary Color",
    name: "colorPrimary",
    placeholder: "#0081F1",
  },
  {
    label: "Primary Foreground",
    name: "colorPrimaryForeground",
    placeholder: "white",
  },
  {
    label: "Secondary Color",
    name: "colorSecondary",
    placeholder: "#F3F3F3",
  },
  {
    label: "Secondary Foreground",
    name: "colorSecondaryForeground",
    placeholder: "#1A1523",
  },
  {
    label: "Counter Color",
    name: "colorCounter",
    placeholder: "#E5484D",
  },
  {
    label: "Counter Foreground",
    name: "colorCounterForeground",
    placeholder: "white",
  },
  {
    label: "Background Color",
    name: "colorBackground",
    placeholder: "#FCFCFC",
  },
  {
    label: "Foreground Color",
    name: "colorForeground",
    placeholder: "#1A1523",
  },
  {
    label: "Neutral Color",
    name: "colorNeutral",
    placeholder: "black",
  },
];

function ColorPickerField({
  register,
  setValue,
  placeholder,
  name,
  label,
  index,
}: {
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  placeholder: string;
  name: string;
  label: string;
  index: number;
}) {
  const [color, setColor] = useColor(placeholder);
  const [openColorPicker, setOpenColorPicker] = useState(false);
  const pickerPosition = index % 2 === 0 ? { left: 0 } : { right: 0 };
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
          <Box position="absolute" top="100%" paddingTop="10px" zIndex={50} {...pickerPosition}>
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

export function InboxDesignForm() {
  const {
    inboxThemeForm: {
      handleSubmit,
      register,
      setValue,
      control,
      formState: { errors, isSubmitting },
      getValues,
    },
  } = useTheme();

  function onSubmit(values: any) {
    alert(JSON.stringify(values, null, 2));
  }

  function handleFormChange(values: any) {
    const val = getValues();
  }

  const availableLanguages = [
    { code: "en", label: "English" },
    { code: "es", label: "Spanish" },
    { code: "fr", label: "French" },
    { code: "ja", label: "Japanese" },
    { code: "de", label: "German" },
    { code: "ru", label: "Russian" },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} onChange={handleFormChange}>
      <VStack spacing={4} alignItems="stretch">
        <Flex flexDirection="column" gap={1}>
          <Text fontSize="xl" fontWeight="medium" lineHeight={1}>
            Configure And Design Inbox Component
          </Text>
          <Text fontSize="15px" color="white" opacity={0.8} lineHeight={1.4} maxW="408px">
            Click on the &quot;Apply Changes&quot; button to see the changes in the Inbox component.
          </Text>
        </Flex>

        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={2.5}
          mt={3}
        >
          <FormLabel mb="0" htmlFor="open" fontSize="sm" mr={0}>
            Keep Inbox Open
          </FormLabel>
          <Switch {...register("open")} size="sm" />
        </FormControl>

        <SimpleGrid columns={1} mt={1.5}>
          <FormLabel fontSize="sm" color="white" opacity={0.6}>
            Select the language for your inbox notifications.
          </FormLabel>
          <Controller
            name="language"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={availableLanguages}
                defaultValue={availableLanguages[0]}
                onChange={(newValue) => field.onChange(newValue?.code)}
                value={availableLanguages.find((lang) => lang.code === field.value) || null}
                chakraStyles={{
                  singleValue: (provided) => ({
                    ...provided,
                    overflow: "visible",
                  }),
                  dropdownIndicator: (provided) => ({
                    ...provided,
                    bg: "transparent",
                    px: 2,
                    cursor: "inherit",
                  }),
                  indicatorSeparator: (provided) => ({
                    ...provided,
                    display: "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    borderRadius: "4px",
                    color: "white",
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    bg: "#1A1E32",
                    border: "1px solid #30385A",
                  }),
                  option: (provided) => ({
                    ...provided,
                    bg: "#1A1E32",
                    _hover: {
                      bg: "rgba(48, 56, 90, 0.50)",
                    },
                  }),
                }}
              />
            )}
          />
        </SimpleGrid>

        <SimpleGrid columns={2} spacing={4}>
          {items.map((item, index) => (
            <ColorPickerField
              key={item.name}
              {...item}
              register={register}
              setValue={setValue}
              index={index}
            />
          ))}
          <FormControl>
            <FormLabel fontSize="sm" color="white" opacity={0.6}>
              Font Size
            </FormLabel>
            <Input {...register("fontSize")} placeholder="inherit" size="sm" />
          </FormControl>
          <FormControl>
            <FormLabel fontSize="sm" color="white" opacity={0.6}>
              Border Radius
            </FormLabel>
            <Input {...register("borderRadius")} placeholder="0.375rem" size="sm" />
          </FormControl>
        </SimpleGrid>
      </VStack>
    </form>
  );
}

export default InboxDesignForm;
