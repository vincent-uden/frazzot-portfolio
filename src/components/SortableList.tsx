import React, { useEffect, useState } from "react";
import type { ReactNode } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { Active, UniqueIdentifier } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";

import { cn } from "../utils/cn";

interface BaseItem {
  id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
  className?: string;
  element?: "div" | "ul" | "ol" | "tbody";
  items: T[];
  onChange(items: T[]): void;
  renderItem(x: { i: number; item: T }): ReactNode;
  onDragStart?(): void;
  onDragEnd?(): void;
}

export function SortableList<T extends BaseItem>({
  className,
  element,
  items,
  onChange,
  renderItem,
  onDragStart,
  onDragEnd,
}: Props<T>) {
  const [active, setActive] = useState<Active | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={({ active }) => {
        setActive(active);
        if (onDragStart !== undefined) {
          onDragStart();
          document.addEventListener("mouseup", () => {
            if (onDragEnd !== undefined) {
              onDragEnd();
            }
          }, { once: true });
        }
      }}
      onDragEnd={({ active, over }) => {
        if (over && active.id !== over?.id) {
          const activeIndex = items.findIndex(({ id }) => id === active.id);
          const overIndex = items.findIndex(({ id }) => id === over.id);

          onChange(arrayMove(items, activeIndex, overIndex));
        }
        setActive(null);
      }}
      onDragCancel={() => {
        setActive(null);
      }}
    >
      <SortableContext items={items}>
        {(element === "div" || element === undefined) && (
          <div className={cn(className)} role="application">
            {items.map((item, i) => (
              <React.Fragment key={item.id}>
                {renderItem({ i, item })}
              </React.Fragment>
            ))}
          </div>
        )}
        {element === "ul" && (
          <ul className={cn(className)} role="application">
            {items.map((item, i) => (
              <React.Fragment key={item.id}>
                {renderItem({ i, item })}
              </React.Fragment>
            ))}
          </ul>
        )}
        {element === "ol" && (
          <ol className={cn(className)} role="application">
            {items.map((item, i) => (
              <React.Fragment key={item.id}>
                {renderItem({ i, item })}
              </React.Fragment>
            ))}
          </ol>
        )}
        {element === "tbody" && (
          <tbody className={cn(className)} role="application">
            {items.map((item, i) => (
              <React.Fragment key={item.id}>
                {renderItem({ i, item })}
              </React.Fragment>
            ))}
          </tbody>
        )}
      </SortableContext>
    </DndContext>
  );
}
