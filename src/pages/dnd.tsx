import { DndContext, useDraggable } from "@dnd-kit/core";
import type { NextPage } from "next";
import Head from "next/head";
import { SortableList } from "../components/SortableList";
import { useState } from "react";
import { DragHandle, SortableItem } from "../components/SortableItem";

function getMockItems() {
  const ids = [];
  for (let i = 0; i < 20; i++) {
    ids.push({ id: i+1 });
  }
  return ids;
}

const Dnd: NextPage = () => {
  const [items, setItems] = useState(getMockItems());

  return (
    <>
      <Head>
        <title>FRAZZOT ⋄ Drag and drop</title>
        <meta name="description" content="Drag and drop example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-screen overflow-y-hidden bg-pattern-holo-short-inv bg-[length:1090px_220px] bg-[center_top_4rem] bg-repeat-x md:bg-[length:1920px_330px]">
        <div className="h-48 md:h-64"></div>
        <h1 className="page-header text-yellowpeach">DRAG-AND-DROP</h1>
        <div className="mt-2 mb-8 bg-holo bg-cover py-2 md:mt-8 md:mb-16">
          <h2 className="page-sub-header">AN EXAMPLE OF DND-KIT</h2>
        </div>
      </div>
      <div className="max-w-screen-lg mx-auto">
        <SortableList
          className={"flex flex-col gap-2"}
          items={items}
          onChange={setItems}
          renderItem={(item) => (
            <SortableItem id={item.id} className="w-32 border border-lilac rounded-lg py-2 px-4 flex flex-row gap-4 bg-greyblack">
              <p className="grow">{item.id}</p>
              <DragHandle className="fill-periwinkle-light py-2 px-1 rounded hover:bg-white/10 transition-colors"/>
            </SortableItem>
          )}
        />
      </div>
    </>
  );
};

export default Dnd;
