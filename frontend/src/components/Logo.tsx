const Logo = ({ classname }: { classname?: string }) => {
  return (
    <div className={classname}>
      <img src="/logo.svg" alt="GG Logo" />
    </div>
  );
};

export default Logo;
