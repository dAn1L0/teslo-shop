import Image from "next/image"


interface Props {
  src?: string
  alt: string
  className?: React.StyleHTMLAttributes<HTMLImageElement>['className']
  style?: React.StyleHTMLAttributes<HTMLImageElement>['style']
  width: number
  height: number
  priority?: boolean
  onMouseEnter?: React.MouseEventHandler<HTMLImageElement> | undefined
  onMouseLeave?: React.MouseEventHandler<HTMLImageElement> | undefined
}

export const ProductImage = ({
  src,
  alt,
  className,
  width,
  height,
  style,
  priority = false,
  onMouseEnter,
  onMouseLeave
}: Props) => {

  const newSrc = (src: string) => {
    if (src.startsWith('http')) {
      return src
    } else if ( src.endsWith('.jpg') || src.endsWith('.png')) {
      return `/products/${src}`
    } else {
      return `/imgs/placeholder.jpg`
    }
  }

  return (
    <Image
      src={newSrc(src ?? '')}
      alt={alt}
      width={width}
      height={height}
      className={className}
      style={style}
      priority={priority}
      onMouseEnter={ onMouseEnter }
      onMouseLeave={ onMouseLeave }
    />
  )
}
