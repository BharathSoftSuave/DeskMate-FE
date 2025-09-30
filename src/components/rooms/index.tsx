interface RoomsProps {
  image?: string;
  roomName?: string;
  borderColor: string;
  alt?: string;
  imageClassName?: string;
}
const Rooms: React.FC<RoomsProps> = ({
  alt,
  image,
  roomName,
  borderColor,
  imageClassName = "w-full h-20",
}) => {
  return (
    <div
      className={`w-full justify-center items-center border-2 `}
      style={{ borderColor: borderColor }}
    >
      <div className="flex flex-col gap-2 w-full justify-center items-center py-6 px-4">
       {image && <img src={image} alt={alt || "room"} className={imageClassName} /> }
        {roomName && <p className="text-lg w-full text-center">{roomName}</p>}
      </div>
    </div>
  );
};
export default Rooms;
