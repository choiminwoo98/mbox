import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NavBar() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  function copy() {
    const el = document.createElement("input");
    el.value = window.location.href;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
  }
  const onCreate = () => {};
  return (
    <nav className="flex justify-between">
      <Link href="/view">
        <img src="/vercel.svg" />
      </Link>
      {/* 기능 고민중.. */}
      <input type="text" placeholder="검색"></input>

      <div>
        {/* 현재 페이지 url 복사 */}
        <button onClick={copy}>{!copied ? "url 복사" : "복사 완료"}</button>

        {/* 앨범 생성 */}
        <button onClick={null}> 앨범 생성</button>
      </div>
      <style jsx>{`
        img {
          max-width: 100px;
          margin-bottom: 5px;
        }
      `}</style>
    </nav>
  );
}
