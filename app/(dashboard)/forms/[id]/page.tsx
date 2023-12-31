import { GetFormById, GetFormWithSubmissions } from "@/actions/form";
import { ElementsType, FormElementsInstance } from "@/components/FormElements";
import FormLinkShare from "@/components/FormLinkShare";
import VisitBtn from "@/components/VisitBtn";
import { ClockIcon, CursorArrowIcon, EyeOpenIcon, FileTextIcon } from "@radix-ui/react-icons";
import { StatsCard } from "../../page";

const FormBuilderPage = async ({ params }: { params: { id: string } }) => {
    const { id } = params;
    const form = await GetFormById(Number(id));

    if (!form) {
        throw new Error("Form not found");
    }

    const { visits, submissions } = form

    let submissionRate = 0

    if (visits > 0) {
        submissionRate = (submissions / visits) * 100;
    }

    const bounceRate = 100 - submissionRate;

    return (
        <>
            <div className="py-10 border-b border-muted">
                <div className="flex justify-between container">
                    <h1 className="text-4xl font-bold truncate">{form.name}</h1>
                    <VisitBtn shareUrl={form.shareURL} />
                </div>
            </div>
            <div className="py-4 border-b border-muted">
                <div className="container flex gap-2 items-center justify-between">
                    <FormLinkShare shareUrl={form.shareURL} />
                </div>
            </div>
            <div className="w-full pt-8 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container">
                <StatsCard
                    title="Total visits"
                    icon={<EyeOpenIcon className="text-blue-600" />}
                    helperText="All time form visits"
                    value={visits.toLocaleString() || ""}
                    loading={false}
                    className=""
                />

                <StatsCard
                    title="Total submissions"
                    icon={<FileTextIcon className="text-yellow-600" />}
                    helperText="All time form submissions"
                    value={submissions.toLocaleString() || ""}
                    loading={false}
                    className=""
                />

                <StatsCard
                    title="Submission rate"
                    icon={<CursorArrowIcon className="text-green-600" />}
                    helperText="Visits that result in form submission"
                    value={submissionRate.toLocaleString() + "%" || ""}
                    loading={false}
                    className=""
                />

                <StatsCard
                    title="Bounce rate"
                    icon={<ClockIcon className="text-red-600" />}
                    helperText="Visits that leaves without interacting"
                    value={bounceRate.toLocaleString() + "%" || ""}
                    loading={false}
                    className=""
                />
            </div>
            <SubmissionTable id={form.id} />
        </>
    )
}

export default FormBuilderPage

type Row = { [key: string]: string } & {
    submittedAt: Date;
}

async function SubmissionTable({ id }: { id: number }) {
    const form = await GetFormWithSubmissions(id);

    if (!form) {
        throw new Error("Form not found");
    }

    const formElements = JSON.parse(form.content) as FormElementsInstance[];
    const columns: {
        id: string;
        label: string;
        required: boolean;
        type: ElementsType;
    }[] = []

    formElements.forEach((element) => {
        switch (element.type) {
            case "TextField":
                // case "NumberField":
                // case "TextAreaField":
                // case "DateField":
                // case "SelectField":
                // case "CheckboxField":
                columns.push({
                    id: element.id,
                    label: element.extraAttributes?.label,
                    required: element.extraAttributes?.required,
                    type: element.type,
                });
                break;
            default:
                break;
        }
    })

    const rows: Row[] = [];
    form.FormSubmissions.forEach((submission) => {
        const content = JSON.parse(submission.content);
        rows.push({
            ...content,
            submittedAt: submission.createdAt,
        })
    })

    return (
        <>
            <div className="text-2xl font-bold my-4">Submissions</div>
        </>
    )

}