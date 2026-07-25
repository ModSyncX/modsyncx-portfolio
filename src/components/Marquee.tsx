interface MarqueeProps {
  items: string[]
}

export default function Marquee({ items }: MarqueeProps) {
  const track = [...items, ...items]

  return (
    <div className="marquee">
      <div className="marquee-track">
        {track.map((item, index) => (
          <span className="marquee-item mono" key={`${item}-${index}`}>
            {item}
            <span className="marquee-dot" aria-hidden="true">
              ●
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
