
import SectionTitle from "@/components/section-title";
import FormFields from "./_components/form-fields";

export default function ProfilePage() {


  return (
    <div className="">
      <SectionTitle
        title="Profile settings"
        className="mb-5 text-[19px] sm:text-[22px] w-fit"
      />
      <section className=" bg-white py-6 px-8 ">
        <SectionTitle
          title="Profile info"
          className="mb-5 text-[17px] sm:text-[19px]"
        />
        <FormFields  />
      </section>
    </div>
  );
}
