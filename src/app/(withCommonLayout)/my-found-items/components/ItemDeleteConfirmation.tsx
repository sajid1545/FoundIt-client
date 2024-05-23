import FoundItAlert from "@/components/shared/FoundItModal/FoundItAlert/FoundItAlert";
import { useDeleteFoundItemMutation } from "@/redux/api/foundItems";
import { toast } from "sonner";

type TProps = {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	id?: string;
};

const ItemDeleteConfirmation = ({ open, setOpen, id }: TProps) => {
	const [deleteFoundItem, { isLoading }] = useDeleteFoundItemMutation();

	const handleCancel = () => {
		setOpen(false);
	};

	const handleDelete = async () => {
		try {
			const res = await deleteFoundItem(id).unwrap();
			if (res?.id) {
				toast.success("Item deleted successfully");
				setOpen(false);
			} else {
				toast.error("Something went wrong");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<FoundItAlert
			open={open}
			setOpen={setOpen}
			title="Are you sure you want to delete this item?"
			handleCancel={handleCancel}
			handleConfirm={handleDelete}
			loading={isLoading}
		/>
	);
};

export default ItemDeleteConfirmation;
