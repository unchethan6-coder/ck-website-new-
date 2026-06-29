'use client'

import Link from 'next/link'
import { CKFtmoInspiredSections } from '@/components/CKFtmoInspiredSections'

const imgImage1 = 'https://www.figma.com/api/mcp/asset/31e527f8-6623-4bc3-899c-027d5f537991'
const imgVector = 'https://www.figma.com/api/mcp/asset/f1362b7b-f662-41df-b4cf-6f98c9c5388c'
const imgImage3 = 'https://www.figma.com/api/mcp/asset/b39b4fd7-92e1-4aa6-9514-78813b224fca'
const imgImage2 = 'https://www.figma.com/api/mcp/asset/810a02c7-dc23-42a2-b7c8-2aac11fdb376'
const imgDiscordShot = 'https://www.figma.com/api/mcp/asset/5b47241b-e6c5-4f13-b950-1d59d7f2975d'

function FigmaDiscordPreview() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-[-180px] hidden w-[820px] md:block lg:right-[-260px] lg:w-[980px] xl:right-[-330px] xl:w-[1140px]">
      <div className="absolute left-[130px] top-[5px] h-[365px] w-[720px] drop-shadow-[4px_4px_25px_rgba(0,0,0,0.4)] lg:h-[470px] lg:w-[920px] xl:h-[653px] xl:w-[1280px]">
        <img alt="Discord CK Capital preview" className="h-full w-full object-cover" src={imgImage3} />
      </div>
      <div className="absolute left-[0px] top-[230px] h-[300px] w-[720px] drop-shadow-[4px_4px_25px_rgba(0,0,0,0.35)] lg:top-[320px] lg:h-[390px] lg:w-[920px] xl:left-[84px] xl:top-[388px] xl:h-[532px] xl:w-[1280px]">
        <img alt="Discord certificates preview" className="h-full w-full object-cover object-top" src={imgImage2} />
      </div>
      <div className="absolute left-[-40px] top-[400px] h-[305px] w-[660px] drop-shadow-[4px_4px_25px_rgba(0,0,0,0.35)] lg:top-[560px] lg:h-[390px] lg:w-[860px] xl:left-[0px] xl:top-[673px] xl:h-[521px] xl:w-[1149px]">
        <img alt="Discord giveaway preview" className="h-full w-full object-cover object-top" src={imgDiscordShot} />
      </div>
    </div>
  )
}

export function DiscordCommunitySection() {
  return (
    <>
      <CKFtmoInspiredSections />
      <section className="relative overflow-hidden bg-background px-4 py-16 md:min-h-[760px] md:px-6 md:py-24 lg:min-h-[880px] xl:min-h-[1040px]">
        <style jsx global>{`
          body > div > section[style*='#010015'],
          body > div > section[style*='rgb(1, 0, 21)'] {
            display: none !important;
          }
        `}</style>

        <div className="pointer-events-none absolute left-[22%] top-[-180px] hidden h-[880px] w-[960px] -rotate-[77deg] scale-y-[-1] opacity-90 md:block lg:left-[28%] lg:top-[-220px] xl:left-[31%] xl:top-[-35px] xl:h-[836px] xl:w-[1238px]">
          <img alt="" className="h-full w-full object-contain blur-[70px] md:blur-[95px] xl:blur-[120px]" src={imgVector} />
        </div>

        <div className="relative z-10 mx-auto max-w-[1680px]">
          <div className="relative z-20 max-w-[620px] md:ml-[40px] lg:ml-[72px] xl:ml-[115px] xl:pt-[72px]">
            <div className="flex items-center gap-6 md:gap-8">
              <img
                alt="Discord"
                src={imgImage1}
                className="h-[68px] w-[90px] object-contain md:h-[90px] md:w-[118px] xl:h-[106px] xl:w-[139.6px]"
              />
              <h2 className="text-[64px] font-bold leading-[1.175] tracking-[-0.035em] text-foreground md:text-[88px] xl:text-[114px]">
                Discord
              </h2>
            </div>

            <p className="mt-10 max-w-[603px] text-[26px] font-bold leading-[1.38] tracking-[0.01em] text-muted-foreground md:text-[34px] xl:mt-10 xl:text-[39.28px]">
              Join the official CK Capital Discord community with support channels, announcements, payout updates, and exclusive events.
            </p>

            <Link
              href="https://discord.gg/ckcapital"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-14 inline-flex h-[74px] w-[310px] items-center justify-center rounded-full bg-primary text-[30px] font-bold leading-[1.175] tracking-[-0.035em] text-foreground shadow-[0px_66.84px_100.26px_rgba(212,175,55,0.2)] transition-transform hover:-translate-y-1 md:mt-20 md:h-[86px] md:w-[390px] md:text-[40px] xl:mt-[190px] xl:h-[96.29px] xl:w-[446.49px] xl:text-[45.87px]"
            >
              JOIN DISCORD
            </Link>
          </div>

          <div className="mt-12 overflow-hidden rounded-3xl bg-[#1E1F22] shadow-[4px_4px_25px_rgba(0,0,0,0.4)] md:hidden">
            <img alt="Discord CK Capital preview" className="h-auto w-full" src={imgImage3} />
          </div>
        </div>

        <FigmaDiscordPreview />
      </section>
    </>
  )
}
