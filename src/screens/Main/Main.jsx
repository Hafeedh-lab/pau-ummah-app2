import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

export const Main = () => {
  // Navigation items data
  const navigationItems = [
    { label: "HOME", href: "#" },
    { label: "ABOUT US", href: "#" },
    { label: "EVENTS", href: "#" },
    { label: "OUR AIM", href: "#" },
  ];

  // Prayer timing data
  const prayerTimings = [
    { name: "FAJR", azan: "05:30", prayer: "05:30" },
    { name: "ZUHR", azan: "12:30", prayer: "12:30" },
    { name: "ASR", azan: "4:16", prayer: "4:16" },
    { name: "MAGRIB", azan: "6:58", prayer: "6:58" },
    { name: "ISHA", azan: "8:08", prayer: "8:08" },
    { name: "JUMMAH", azan: "1:45", prayer: "1:45" },
  ];

  // Past events data
  const pastEvents = [
    { title: "IFTAR DINNER", link: "/desktop-u45-1" },
    { title: "SEMINARS", link: "/desktop-u45-1", hasIcon: true },
    { title: "IFTAR DINNER", link: "/desktop-u45-1" },
    { title: "IFTAR DINNER", link: null },
    { title: "IFTAR DINNER", link: null },
    { title: "IFTAR DINNER", link: null },
    { title: "IFTAR DINNER", link: null },
    { title: "IFTAR DINNER", link: null },
    { title: "IFTAR DINNER", link: null },
  ];

  // Upcoming events data
  const upcomingEvents = [
    {
      title: "ISLAMIC SEMINAR",
      time: "Every Saturday 10:00AM",
    },
    {
      title: "GAME NIGHT",
      time: "Every Wednesday/After Isha prayer",
      hasVision: true,
    },
    {
      title: "GAME NIGHT",
      time: "Every Wednesday/After Isha prayer",
    },
    {
      title: "GAME NIGHT",
      time: "Every Wednesday/After Isha prayer",
    },
  ];

  // Carousel dots data
  const carouselDots = [
    { active: false, opacity: "opacity-[0.66]" },
    { active: false, opacity: "opacity-[0.34]" },
  ];

  return (
    <div
      className="bg-white grid justify-items-center [align-items:start] w-screen"
      data-model-id="17:29"
    >
      <div className="bg-white overflow-hidden w-[1440px] h-[5608px] relative">
        {/* Header Contact Bar */}
        <header className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:0ms]">
          <div className="absolute w-[1269px] h-[65px] top-[5px] left-[86px] bg-[#58a44d]">
            <div className="absolute top-[19px] left-[124px] font-medium text-white text-[22px] [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]">
              +234 567 889 23
            </div>

            <img
              className="absolute w-[49px] h-[49px] top-3 left-[526px]"
              alt="Ic outline email"
              src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/ic-outline-email.svg"
            />

            <div className="absolute top-[19px] left-[580px] [font-family:'Montserrat',Helvetica] font-normal text-white text-[22px] tracking-[0] leading-[normal]">
              pau.edu.ng
            </div>

            <img
              className="absolute w-7 h-[41px] top-[13px] left-[829px]"
              alt="Vector"
              src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/vector.svg"
            />

            <div className="absolute top-[26px] left-[865px] [font-family:'Montserrat',Helvetica] font-semibold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Pan atlantic university Ibeju lekki
            </div>
          </div>

          <div className="absolute top-[-31px] left-[651px] [font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
            CONTACT US
          </div>
        </header>

        {/* Navigation */}
        <nav className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:200ms]">
          <div className="absolute top-[156px] left-[98px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            PAN ATLANTIC UNIVERSITY MOSQUE
          </div>

          <img
            className="absolute w-[42px] h-[42px] top-[140px] left-[54px]"
            alt="Noto mosque"
            src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/noto-v1-mosque.svg"
          />

          <div className="inline-flex items-center gap-[30px] absolute top-[159px] left-[577px]">
            {navigationItems.map((item, index) => (
              <div
                key={index}
                className="relative w-fit mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-lg tracking-[0] leading-[normal]"
              >
                {item.label}
              </div>
            ))}
          </div>

          <div className="absolute w-[230px] h-[53px] top-[141px] left-[1180px]">
            <Button className="relative w-[228px] h-[53px] bg-[#34495e] h-auto">
              <div className="absolute top-4 left-11 [font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
                DONATE NOW
              </div>
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:400ms]">
          <div className="absolute w-[1441px] h-[651px] top-[196px] -left-px">
            <div className="absolute w-[1441px] h-[646px] top-0 left-0">
              <div className="absolute w-[1440px] h-[552px] top-px left-0 bg-[#34495e] rotate-[0.09deg]" />

              <div className="absolute top-[369px] left-[81px] [font-family:'Montserrat',Helvetica] font-bold text-white text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                A home for muslim students tha attend pan atlantic university
              </div>

              <div className="absolute w-[583px] top-[133px] left-[72px] [font-family:'Montserrat',Helvetica] font-bold text-white text-[64px] tracking-[0] leading-[normal]">
                WELCOME TO PAU MUSLIM COMMUNITY
              </div>

              <Button className="absolute w-[292px] h-[50px] top-[427px] left-[81px] bg-white h-auto">
                <div className="absolute top-[13px] left-[9px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-lg tracking-[0] leading-[normal]">
                  JOIN OUR COMMUNITY NOW
                </div>
              </Button>

              <div className="absolute w-[606px] h-[606px] top-4 left-[803px]">
                <img
                  className="absolute w-[549px] h-[454px] top-[47px] left-7"
                  alt="Vector"
                  src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/vector-3.svg"
                />
              </div>
            </div>

            <div className="absolute top-[607px] left-[76px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-4xl tracking-[0] leading-[normal]">
              WELCOME TO THE MASGID
            </div>
          </div>
        </section>

        {/* Prayer Timing Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:600ms]">
          <div className="absolute top-[602px] left-[971px] text-4xl [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] tracking-[0] leading-[normal]">
            PRAYER TIMING
          </div>

          <div className="flex flex-col w-[130px] gap-5 top-[863px] left-[820px] items-center absolute">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-lg tracking-[0] leading-[normal]">
              Name of salat
            </div>

            {prayerTimings.map((prayer, index) => (
              <div
                key={index}
                className="relative self-stretch [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-lg text-center tracking-[0] leading-[normal]"
              >
                {prayer.name}
              </div>
            ))}

            <div className="relative w-12 h-12" />
          </div>

          <div className="flex flex-col w-24 gap-[19px] top-[863px] left-[1046px] items-center absolute">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-lg tracking-[0] leading-[normal]">
              Azan time
            </div>

            {prayerTimings.map((prayer, index) => (
              <div
                key={index}
                className="relative self-stretch font-bold text-[#34495e] text-lg text-center [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]"
              >
                {prayer.azan}
              </div>
            ))}
          </div>

          <div className="flex flex-col w-24 gap-[19px] top-[863px] left-[1238px] items-center absolute">
            <div className="relative w-[114px] mt-[-1.00px] ml-[-9.00px] mr-[-9.00px] text-lg [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] tracking-[0] leading-[normal]">
              Prayer time
            </div>

            {prayerTimings.map((prayer, index) => (
              <div
                key={index}
                className="relative self-stretch font-bold text-[#34495e] text-lg text-center [font-family:'Montserrat',Helvetica] tracking-[0] leading-[normal]"
              >
                {prayer.prayer}
              </div>
            ))}
          </div>
        </section>

        {/* Our Aim Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:800ms]">
          <div className="top-[851px] left-[75px] font-bold text-lg absolute [font-family:'Montserrat',Helvetica] text-black tracking-[0] leading-[normal]">
            OUR AIM
          </div>

          <div className="absolute w-[645px] top-[874px] left-[75px] [font-family:'Montserrat',Helvetica] font-medium text-[#001f3f] text-xl tracking-[0] leading-[normal]">
            Norem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu
            turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus
            nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum
            tellus elit sed risus. Maecenas eget condimentum velit, sit amet
            feugiat lectus. Class aptent taciti sociosqu ad litora torquent per
            conubia nostra, per inceptos himenaeos. Praesent auctor purus luctus
            enim egestas, ac scelerisque ante pulvinar. Donec ut rhoncus ex.
            Suspendisse ac rhoncus nisl, eu tempor urna. Curabitur vel bibendum
            lorem. Morbi convallis convallis diam sit amet lacinia. Aliquam in
            elementum tellus.
          </div>

          <Button className="absolute w-[228px] h-[53px] top-[1140px] left-[79px] bg-[#34495e] h-auto">
            <div className="absolute top-[15px] left-[53px] [font-family:'Montserrat',Helvetica] font-bold text-white text-lg tracking-[0] leading-[normal]">
              READ MORE
            </div>
          </Button>
        </section>

        {/* What The Mosque Does Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1000ms]">
          <div className="absolute top-[1446px] left-[157px] [text-shadow:0px_4px_4px_#00000040] [font-family:'Montserrat',Helvetica] font-bold text-[#34495e] text-[32px] tracking-[0] leading-[normal]">
            WHAT THE MOSQUE DOES
          </div>

          <img
            className="absolute w-[1105px] h-[609px] top-[1512px] left-[156px]"
            alt="Vector"
            src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/vector-2.svg"
          />

          <div className="absolute w-[77px] h-[79px] top-[1686px] left-[1620px] bg-[#d9d9d9] rounded-[38.5px/39.5px] rotate-[145.88deg]" />

          {/* Carousel Navigation Dots */}
          {carouselDots.map((dotGroup, groupIndex) => (
            <div
              key={groupIndex}
              className={`inline-flex gap-5 top-[2134px] ${groupIndex === 0 ? "left-[483px]" : "left-[743px]"} ${dotGroup.opacity} items-center absolute`}
            >
              <div className="relative w-[43px] h-[41px] bg-[#34495e] rounded-[21.5px/20.5px]" />
              <div className="relative w-[43px] h-[41px] bg-white rounded-[21.5px/20.5px]" />
              <div className="relative w-[43px] h-[41px] bg-[#34495e] rounded-[21.5px/20.5px]" />
              <div className="relative w-[43px] h-[41px] bg-[#34495e] rounded-[21.5px/20.5px]" />
            </div>
          ))}
        </section>

        {/* Past Events Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1200ms]">
          <div className="absolute top-[2547px] left-[550px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-[40px] tracking-[0] leading-[normal]">
            PAST EVENTS
          </div>

          <div className="grid grid-cols-3 gap-x-[167px] gap-y-[83px] absolute top-[2692px] left-[147px]">
            {pastEvents.map((event, index) => {
              const row = Math.floor(index / 3);
              const col = index % 3;
              const topPositions = [0, 254, 573];
              const leftPositions = [0, 444, 885];

              return (
                <div key={index} className="relative">
                  {event.link ? (
                    <Link
                      className="block w-[276px] h-[171px] bg-white shadow-[0px_8px_4px_#00000040]"
                      to={event.link}
                    />
                  ) : (
                    <Card className="w-[276px] h-[171px] bg-white shadow-[0px_8px_4px_#00000040]">
                      <CardContent className="p-0 h-full" />
                    </Card>
                  )}

                  {event.hasIcon && (
                    <img
                      className="absolute w-6 h-6 top-[100px] left-[117px]"
                      alt="Iconoir send"
                      src="https://c.animaapp.com/mfmgcuqiRKBTyz/img/iconoir-send.svg"
                    />
                  )}

                  <div
                    className={`absolute ${row === 0 ? "top-[188px]" : row === 1 ? "top-[188px]" : "top-[188px]"} left-[62px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-xl tracking-[0] leading-[normal] whitespace-nowrap`}
                  >
                    {event.title}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Upcoming Events Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1400ms]">
          <div className="absolute top-[3745px] left-[512px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-[40px] tracking-[0] leading-[normal]">
            UPCOMING EVENTS
          </div>

          {upcomingEvents.map((event, index) => {
            const topPositions = [3884, 4176, 4407, 4638];
            const leftPositions = [139, 168, 168, 168];

            return (
              <Card
                key={index}
                className={`absolute w-[1103px] h-[142px] top-[${topPositions[index]}px] left-[${leftPositions[index]}px] bg-white shadow-[8px_4px_4px_#00000040]`}
              >
                <CardContent className="p-0 relative h-full">
                  {event.hasVision && (
                    <div className="w-[279px] top-[22px] left-[141px] font-medium text-xl absolute [font-family:'Montserrat',Helvetica] text-black tracking-[0] leading-[normal]">
                      OUR VISION
                    </div>
                  )}

                  <div
                    className={`absolute w-[512px] ${index === 0 ? "top-4" : index === 1 ? "top-9" : index === 2 ? "top-14" : "top-14"} left-[${index === 0 ? "51px" : "22px"}] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-2xl tracking-[0] leading-[normal]`}
                  >
                    {event.title}
                  </div>

                  <div
                    className={`absolute w-[987px] ${index === 0 ? "top-[55px]" : index === 1 ? "top-[70px]" : index === 2 ? "top-[87px]" : "top-[90px]"} left-[${index === 0 ? "51px" : "22px"}] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-2xl tracking-[0] leading-[normal]`}
                  >
                    {event.time}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </section>

        {/* Call to Action Section */}
        <section className="translate-y-[-1rem] animate-fade-in opacity-0 [--animation-delay:1600ms]">
          <div className="absolute top-[5382px] left-[150px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
            Whether youre a student seeking guidance looking for a place to
            pray,or eager to volunteer-you belong here
          </div>

          <Button className="absolute w-[389px] h-[78px] top-[5454px] left-[280px] bg-[#58a44d] h-auto">
            <div className="absolute top-[26px] left-[100px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Volunteer with us
            </div>
          </Button>

          <Button className="absolute w-[389px] h-[78px] top-[5454px] left-[771px] bg-[#58a44d] h-auto">
            <div className="absolute top-[26px] left-[71px] [font-family:'Montserrat',Helvetica] font-bold text-[#001f3f] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
              Join our whatsapp group
            </div>
          </Button>
        </section>
      </div>
    </div>
  );
};
