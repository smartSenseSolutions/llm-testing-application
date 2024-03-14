import { useState, ComponentProps } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../Button'
import { ConfirmationPopup as ConfirmationPopupComp } from './ConfirmationPopup.component'

const meta: Meta<typeof ConfirmationPopupComp> = {
  title: 'ConfirmationPopup',
  component: ConfirmationPopupComp,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof ConfirmationPopupComp>

const renderConfirmation = (
  props: ComponentProps<typeof ConfirmationPopupComp>
) => {
  const [open, setOpen] = useState(false)

  const handleConfirmationPopup = () => {
    setOpen(false)
  }

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Click to open popup
      </Button>
      <ConfirmationPopupComp
        {...props}
        open={open}
        onCancelButtonClick={handleConfirmationPopup}
        onConfirmButtonClick={handleConfirmationPopup}
        onClose={handleConfirmationPopup}
      />
    </>
  )
}

export const ConfirmationPopup: Story = {
  render: renderConfirmation,
}
