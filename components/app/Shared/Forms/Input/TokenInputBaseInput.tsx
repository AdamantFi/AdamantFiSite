export default function TokenInputBaseInput({
  amount,
  handleChange,
}: {
  amount: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      className="rounded-l-xl text-2xl font-bold py-2 px-[21px] bg-adamant-app-input w-full outline-none hover:bg-adamant-app-selectTrigger focus:bg-adamant-app-selectTrigger"
      placeholder="0.0"
      value={amount}
      onChange={handleChange}
    />
  );
}
