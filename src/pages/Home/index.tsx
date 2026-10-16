/**
 * 首页：由 Hero、个人介绍、技能、项目、联系各模块组成
 * 各模块通过 id 锚点与导航/CTA 联动
 */
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
