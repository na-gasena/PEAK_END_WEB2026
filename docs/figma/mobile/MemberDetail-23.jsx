import { imgLine12 } from "./svg-yezxy";
const imgRinProf1 = "C:/Freefile/PROJECT/2026/01_WEB_PKEND/docs/figma/mobile/images/5dfbf4105817b96213ca384b903643d993d6c352.png";
const imgTextBox = "C:/Freefile/PROJECT/2026/01_WEB_PKEND/docs/figma/mobile/images/5b4f3e62db1044de81f479951e83863a662235e5.png";
const imgRinProf2 = "C:/Freefile/PROJECT/2026/01_WEB_PKEND/docs/figma/mobile/images/63e4ec37dcc1d366edcc53ce9a5ae7d1dc8009b3.png";

function Content({ className }: { className?: string }) {
  return (
    <div className={className || "content-stretch flex flex-col gap-[10px] h-[571px] items-center relative w-[267px]"} data-name="Content" data-node-id="2031:887">
      <div className="bg-[var(--keycolor,#deca37)] border-2 border-[var(--bgcolor,#ffffeb)] border-solid content-stretch flex flex-col items-center justify-center px-[10px] relative rounded-[5px] shrink-0" data-node-id="2031:879">
        <p className="font-[family-name:var(--mainfont,'Shippori_Antique_B1:Regular',sans-serif)] leading-[0] not-italic relative shrink-0 text-[0px] text-black text-center whitespace-nowrap" data-node-id="2031:880">
          <span className="font-['Zen_Kaku_Gothic_New:Regular',sans-serif] leading-[normal] text-[20px]">シン・チェリン</span>
          <span className="font-['Zen_Kaku_Gothic_New:Regular',sans-serif] leading-[normal] text-[12px]">(監督/企画/出演)</span>
        </p>
      </div>
      <div className="border-2 border-[var(--keycolor,#deca37)] border-solid content-stretch flex items-center justify-center p-[11px] relative shrink-0 size-[192px]" data-node-id="2031:881">
        <div className="relative rounded-[10px] shrink-0 size-[170px]" data-name="Rin_Prof 1" data-node-id="2031:882">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgRinProf1} />
        </div>
      </div>
      <div className="bg-[var(--heading,#fefefe)] content-stretch flex items-center justify-center relative rounded-[2px] shrink-0" data-node-id="2031:883">
        <p className="font-['Shippori_Antique_B1:Regular',sans-serif] h-[14px] leading-[normal] not-italic relative shrink-0 text-[10px] text-[color:var(--keycolor,#deca37)] text-center w-[63px]" data-node-id="2031:884">
          # members
        </p>
      </div>
      <div className="border-2 border-[var(--keycolor,#deca37)] border-solid content-stretch flex flex-col items-center px-[30px] py-[20px] relative rounded-[12px] shrink-0 w-[333px]" data-name="TextBox" data-node-id="2031:885">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgTextBox} />
        <div className="font-[family-name:var(--mainfont,'Zen_Kaku_Gothic_New:Regular',sans-serif)] leading-[0] not-italic relative shrink-0 text-[11px] text-black w-full whitespace-pre-wrap" data-node-id="2031:886">
          <p className="leading-[normal] mb-0">1998年韓国ソウル生まれ。</p>
          <p className="leading-[normal] mb-0">2025年、京都芸術大学芸術学部映画学科映画製作コース卒業。</p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p className="leading-[normal] mb-0">韓国で大学の写真学科に所属していた20歳の年に、日本へ留学することを決心する。</p>
          <p className="leading-[normal] mb-0">大学1年生の頃から監督として映画製作に積極的に関わる。3年生では初の長編劇映画『水槽』を監督する。</p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p className="leading-[normal] mb-0">卒業制作として監督した『PEAK END』は、ドキュメンタリーとしての要素を取り入れた初の試みだった。</p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p className="leading-[normal] mb-0">『PEAK END』の劇中に登場する子猫の「ぴぬ」は、すくすく成長し、今では2人目の家族「くるみ」と毎晩部屋をかけっこしている。毎朝、服についているフワフワな毛をコロコロしてバタバタと出勤するのがルーティンだ。</p>
          <p className="leading-[normal] mb-0">&nbsp;</p>
          <p className="leading-[normal]">ただ、勤務中に頭にあるのは2人の愛猫と、現在進行中の長編劇映画の企画のことばかり。</p>
        </div>
      </div>
      <div className="content-stretch flex flex-col items-center relative shrink-0 w-[353px]" data-name="Footer" data-node-id="2037:5856">
        <div className="h-0 relative shrink-0 w-full" data-node-id="2037:5857">
          <div className="absolute inset-[-1px_0_0_0]">
            <img alt="" className="block max-w-none size-full" src={imgLine12} />
          </div>
        </div>
        <div className="relative rounded-[10px] shrink-0 size-[45px]" data-name="Rin_Prof 1" data-node-id="2037:5858">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[10px] size-full" src={imgRinProf2} />
        </div>
      </div>
    </div>
  );
}

export default function IPhone16Members() {
  return (
    <div className="relative size-full" data-name="iPhone 16 - membersシン・チェリン" data-node-id="2093:7153">
      <div className="-translate-x-1/2 -translate-y-1/2 absolute bg-[var(--bgwhite,#fefefe)] border border-solid border-white h-[754px] left-[calc(50%+0.5px)] opacity-84 top-1/2 w-[366px]" data-name="OverlayBackground" data-node-id="2031:471" />
      <Content className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex flex-col gap-[10px] h-[571px] items-center left-1/2 top-[calc(50%+0.5px)] w-[267px]" />
    </div>
  );
}