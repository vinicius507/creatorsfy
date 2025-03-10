"use client";

type Props = {
  size?: number;
};

export const Logo: React.FC<Props> = ({ size }) => {
  return (
    <span
      style={{
        fontSize: size ?? 24,
        fontWeight: 700,
        letterSpacing: "-0.025em",
      }}
    >
      {"Creatorsfy."}
    </span>
  );
};
