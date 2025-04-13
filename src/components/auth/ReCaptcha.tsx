
import React, { useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

const ReCaptchaComponent: React.FC<ReCaptchaProps> = ({ onChange }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  return (
    <div className="flex justify-center w-full my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is Google's test key - replace with your actual site key in production
        onChange={onChange}
        theme="dark"
      />
    </div>
  );
};

export default ReCaptchaComponent;
