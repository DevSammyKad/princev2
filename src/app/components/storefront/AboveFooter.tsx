import { aboveFooterData, AboveFooterType } from '@/constants/index';
export default function AboveFooter() {
  return (
    <>
      <div className="grid grid-cols-4 max-md:grid-cols-2 p-5 gap-6 bg-white rounded-lg shadow-sm lg:max-w-7xl mx-auto my-16 max-sm:my-10">
        {aboveFooterData.map((item: AboveFooterType, index) => (
          <div className="flex items-center gap-4" key={index}>
            <div> {item.icons && <item.icons />}</div>
            <div className="flex flex-col font-medium">
              {item.title}
              <span className="font-normal text-neutral-600">{item.para}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

//   aboveFooterData.map((item: AboveFooterType, index) => (
//     <div
//       key={index}
//       className="grid-cols-4 max-md:grid-cols-2 bg-red-300 w-8 h-8"
//     >
//       <div className=" bg-green-700 w-8 h-8 p-5"> </div>
//     </div>
//   ));
// }
