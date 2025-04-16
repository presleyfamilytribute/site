
import React, { useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface ReCaptchaProps {
  onChange: (token: string | null) => void;
}

const ReCaptchaComponent: React.FC<ReCaptchaProps> = ({ onChange }) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Reset reCAPTCHA on component unmount for security
  useEffect(() => {
    return () => {
      if (recaptchaRef.current) {
        onChange(null);
        recaptchaRef.current.reset();
      }
    };
  }, [onChange]);

  // Handle expiry of reCAPTCHA token
  const handleExpire = () => {
    onChange(null);
    // Notify user if needed
    console.log("reCAPTCHA has expired, please verify again");
  };

  // Handle errors with reCAPTCHA
  const handleErrored = () => {
    onChange(null);
    console.error("reCAPTCHA encountered an error");
  };

  return (
    <div className="flex justify-center w-full my-4">
      <ReCAPTCHA
        ref={recaptchaRef}
        sitekey="6LdaKhorAAAAAL28pv_yu3uwX10BkaSH1WBlvhOV" 
        onChange={onChange}
        onExpired={handleExpire}
        onErrored={handleErrored}
        theme="dark"
      />
    </div>
  );
};

export default ReCaptchaComponent;
