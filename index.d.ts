import { ReactNode } from 'react'

export type TextPosition = 
| 'left'
| 'center'
| 'right'

export interface SimpleStepperProps {
    initialValue?: number
    minimumValue?: number
    maximumValue?: number
    stepValue?: number
    valueChanged(value: number): void
    activeOpacity?: number
    disabledOpacity?: number
    incrementImage?: string | number
    decrementImage?: string | number
    disabled?: boolean
    renderDecrementImage(
        props: SimpleStepperProps,
    ): ReactNode
    renderIncrementImage(
        props: SimpleStepperProps,
    ): ReactNode
    renderDecrementStep(
        props: SimpleStepperProps,
    ): ReactNode
    renderIncrementStep(
        props: SimpleStepperProps,
    ): ReactNode
    wraps?: boolean
    onMin(value: number): void
    onMax(value: number): void
    onIncrement(value: number): void
    onDecrement(value: number): void
    showText?: boolean
    renderText(value: number ): ReactNode
    textStyle?: object
    containerStyle?: object
    separatorStyle?: object
    incrementStepStyle?: object
    decrementStepStyle?: object
    incrementImageStyle?: object
    decrementImageStyle?: object
    textPosition?: TextPosition
}