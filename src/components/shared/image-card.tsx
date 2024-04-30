import HeartIcon from '@/components/icon/hearticon'
import MessageCircleIcon from '@/components/icon/messagecircleicon'

const ImageCard = () => {
  return (
    <div className="group relative block aspect-square overflow-hidden rounded-lg">
      <img
        alt="Post"
        className="h-full w-full object-cover transition-all duration-300 group-hover:scale-105"
        height={400}
        src="/placeholder.svg"
        style={{
          aspectRatio: '400/400',
          objectFit: 'cover'
        }}
        width={400}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center gap-2 text-white">
          <HeartIcon className="h-5 w-5" />
          <span>123</span>
          <MessageCircleIcon className="h-5 w-5" />
          <span>45</span>
        </div>
      </div>
    </div>
  )
}

export default ImageCard
