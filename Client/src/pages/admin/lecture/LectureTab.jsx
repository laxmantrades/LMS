import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  useEditLecureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
const MEDIAAPI = "http://localhost:5001/api/v1/media";

const LectureTab = () => {
  const params = useParams();
  const { lectureId, courseId } = params;

  const [title, setTitle] = useState("");

  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsfree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIAAPI}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            const percentage = Math.round((loaded * 100) / total);
            setUploadProgress(percentage);
          },
        });
        if (res.data.success) {
          console.log(res);
          toast.success(res.data.message);
          setUploadVideoInfo({
            videoUrl: res.data.data.url,
            publicId: res.data.data.public_id,
          });
          setBtnDisable(false);
        }
      } catch (error) {
        console.log(error);
        toast.error("Video upload failed");
        setMediaProgress(false);
      } finally {
        setMediaProgress(false);
      }
    }
  };
  //API LISTS
  const [editLecture, { data, isLoading, isSuccess, isError, error }] =
    useEditLecureMutation();
  const [
    removeLecture,
    {
      data: removeLectureData,
      isLoading: loadingRemoveLecture,
      isError: errorRemoveLecture,
      isSuccess: successRemoveLecture,
    },
  ] = useRemoveLectureMutation();
  const {
    getLectureById,
    data: lectureData,
    isSuccess: lectureSuccess,
    isError: lectureError,
  } = useGetLectureByIdQuery(lectureId);

  //
  useEffect(() => {
    if (successRemoveLecture) {
      toast.success(
        removeLectureData.message || "Removed the account succefully"
      );
    }
  }, [successRemoveLecture, removeLectureData]);
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Succefully updated the lecture");
    }
    if (isError) {
      toast.error(error.data.message || "Failed to update the lecture");
    }
  }, [data, isSuccess, isError]);
  useEffect(() => {
    setTitle(lectureData?.lecture?.lectureTitle||"");
    setIsfree(lectureData?.lecture?.isPreviewFree);
  }, [lectureData]);

  const removeLectureHandler = async () => {
    removeLecture(lectureId);
  };

  const updateLectue = async () => {
    await editLecture({
      lectureId,
      lectureTitle: title,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
    });
  };

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={removeLectureHandler} variant="destructive">
            {loadingRemoveLecture ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <Label>Title</Label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="my-5">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={()=>setIsfree(prevState => !prevState)}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>
        <div>
          {mediaProgress && (
            <div className="my-4">
              <Progress value={uploadProgress} className="w-[60%]" />
              <p>{uploadProgress}%uploaded</p>
            </div>
          )}
        </div>

        <div className="mt-4">
          <Button onClick={updateLectue}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
export default LectureTab;
