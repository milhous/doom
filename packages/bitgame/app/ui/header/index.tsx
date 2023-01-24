import Image from 'next/image'

import './index.scss';

import logo from './assets/logo.png';

import CompNav from './components/CompNav';
// import CompButtons from './components/CompButtons';

// header
const UIHeader =  async (): Promise<JSX.Element> => {
  return (
    <header className="ui-header">
      <section>
        <aside>
          <Image
            className="ui-header_logo"
            src={logo.src}
            alt="Picture of the author"
            width={logo.width}
            height={logo.height}
          />
        </aside>
        <article>
          {/* @ts-expect-error Server Component */}
          <CompNav />
          {/* 
          <CompButtons /> */}
        </article>
      </section>
    </header>
  );
};

export default UIHeader;
