import Eyebrow from "@/components/shared/eyebrow";

const AccessibilityCommitment = () => {
  return (
    <div className="mx-auto max-w-[820px] rounded-2xl border border-dr-bd-2 bg-dr-surface p-[38px] text-center md:p-[48px]">
      <Eyebrow align="center" className="mb-4">
        Our commitment
      </Eyebrow>
      <h2 className="inline-block font-chakra text-[28px] font-bold text-dr-text md:text-[32px]">
        Accessibility, by default
        <span className="mx-auto mt-2 block h-[3px] w-[150px] rounded-sm bg-gradient-to-r from-white to-dr-red" />
      </h2>
      <div className="mx-auto my-[22px] h-px w-20 bg-gradient-to-r from-transparent via-dr-red to-transparent" />
      <p className="mx-auto max-w-[600px] text-[15px] leading-[1.75] text-dr-text-2">
        We believe technology should be accessible to everyone, regardless of
        ability. Our commitment to digital accessibility ensures all users can
        navigate, understand, and interact with our platform effectively. We
        continuously audit and improve to create an inclusive experience for
        every customer.
      </p>
    </div>
  );
};

export default AccessibilityCommitment;
