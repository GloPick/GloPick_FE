import { Button } from '@/components/button';

const Test = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <Button text="lg 버튼1" size="sm" />
        <Button text="md 버튼2" size="md" color="secondary" />
        <Button text="버튼3" size="lg" disabled />
      </div>
    </div>
  );
};

export default Test;
