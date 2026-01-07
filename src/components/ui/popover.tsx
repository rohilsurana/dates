"use client"

import * as React from "react"
import * as PopoverPrimitive from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"

function Popover({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Root>) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}

function PopoverTrigger({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger>) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}

function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  onOpenAutoFocus,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  const resizeListenerRef = React.useRef<(() => void) | null>(null)

  const updatePosition = React.useCallback(() => {
    const content = document.querySelector('[data-slot="popover-content"]')
    if (!content) return

    const wrapper = content.parentElement
    if (!wrapper || !wrapper.hasAttribute('data-radix-popper-content-wrapper')) return

    const trigger = document.querySelector('[data-slot="popover-trigger"][aria-expanded="true"]')
    if (!trigger) return

    const triggerRect = trigger.getBoundingClientRect()

    // Position the wrapper relative to the trigger button
    wrapper.style.setProperty('transform', 'none', 'important')
    wrapper.style.setProperty('position', 'fixed', 'important')
    wrapper.style.setProperty('left', `${triggerRect.left}px`, 'important')
    wrapper.style.setProperty('top', `${triggerRect.bottom + sideOffset}px`, 'important')
  }, [sideOffset])

  const handleOpenAutoFocus = React.useCallback((event: Event) => {
    // Call the original handler if provided
    onOpenAutoFocus?.(event)

    // Fix positioning when popover opens
    updatePosition()
    setTimeout(updatePosition, 0)
    setTimeout(updatePosition, 10)
    setTimeout(updatePosition, 50)

    // Set up resize listener if not already set
    if (!resizeListenerRef.current) {
      resizeListenerRef.current = updatePosition
      window.addEventListener('resize', updatePosition)
    }
  }, [onOpenAutoFocus, updatePosition])

  React.useEffect(() => {
    return () => {
      // Clean up resize listener on unmount
      if (resizeListenerRef.current) {
        window.removeEventListener('resize', resizeListenerRef.current)
        resizeListenerRef.current = null
      }
    }
  }, [])

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        onOpenAutoFocus={handleOpenAutoFocus}
        className={cn(
          "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-auto min-w-[280px] origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden [background:oklch(var(--popover))] [color:oklch(var(--popover-foreground))]",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}

function PopoverAnchor({
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Anchor>) {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}

export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
