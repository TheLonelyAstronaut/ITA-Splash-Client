import React from 'react';

import { RawInputText, TextWrapper } from './styled/authentication.styled';

export type InputTextProps = {
    children: React.ReactNode;
};

export const InputText: React.FC<InputTextProps> = (props: InputTextProps) => (
    <TextWrapper>
        <RawInputText>{props.children}</RawInputText>
    </TextWrapper>
);
