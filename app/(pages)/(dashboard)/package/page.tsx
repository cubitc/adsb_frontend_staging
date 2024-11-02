"use client";
import TopNav, { TabItemType } from "@/app/_frontend/components/TopNav";
import { Button } from "rizzui";

const tabItems: TabItemType[] = [
  {
    label: "Purchase",
    href: "",
  },
  {
    label: "Purchase Logs",
    href: "",
  },
];
const PackagePage = () => {
  return (
    <div>
      <TopNav items={tabItems} />
      <div className="text-white">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          <div className="w-full text-white border border-gray-500 rounded-md ">
            <div className="flex flex-col items-center justify-center px-4 py-2 bg-dark-orange gap-y-2 rounded-t-md">
              <div className="text-lg font-medium uppercase">rrr</div>
              <div className="text-5xl font-semibold uppercase">12</div>
            </div>
            <div className="flex flex-col px-4 py-6 text-gray-300 divide-y divide-gray-400 gap-y-4 divide-dashed">
              <div className="">
                Cycle Return
                <span className="  text-lg text-green-400"> 12</span>
              </div>
              <div className="pt-4">
                Cycle position{" "}
                <span className="  text-lg text-green-400">#3</span>
              </div>
              <div className="pt-4">
                Cycle until payout{" "}
                <span className="  text-lg text-green-400">#4</span>
              </div>
            </div>
            <div className="flex justify-center mx-8">
              <Button
                variant="solid"
                className="w-full text-white bg-dark-orange hover:bg-dark-orange/70  my-2 mb-4"
              >
                Purchase Queue
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PackagePage;
