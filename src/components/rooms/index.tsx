interface RoomsProps {
  image: string;
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
      className={`w-full justify-center items-center  border-[${borderColor}] border-2`}
    >
      <div className="flex flex-col gap-2 w-full justify-center items-center py-6 px-4">
        <img src={image} alt={alt || "room"} className={imageClassName} />
        {roomName && <p className="text-lg w-full text-center">{roomName}</p>}
      </div>
    </div>
  );
};
export default Rooms;
