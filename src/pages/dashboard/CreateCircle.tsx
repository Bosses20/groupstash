import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const createCircleSchema = z.object({
  name: z.string().min(3, {
    message: "Circle name must be at least 3 characters.",
  }),
  description: z.string().optional(),
  contributionAmount: z.string().transform((val) => Number(val)),
  frequency: z.enum(["weekly", "monthly", "bi-weekly"]),
});

type Member = {
  id: string;
  name: string;
  phone: string;
};

export default function CreateCircle() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [members, setMembers] = useState<Member[]>([]);
  const [newMember, setNewMember] = useState({ name: "", phone: "" });

  const form = useForm({
    resolver: zodResolver(createCircleSchema),
    defaultValues: {
      name: "",
      description: "",
      contributionAmount: "",
      frequency: "monthly",
    },
  });

  const addMember = () => {
    if (newMember.name && newMember.phone) {
      setMembers([
        ...members,
        { ...newMember, id: Math.random().toString(36).substr(2, 9) },
      ]);
      setNewMember({ name: "", phone: "" });
    }
  };

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(members);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setMembers(items);
  };

  const onSubmit = async (data: z.infer<typeof createCircleSchema>) => {
    try {
      // Mock API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const circleData = {
        ...data,
        members: members.map((member, index) => ({
          ...member,
          payoutOrder: index + 1,
        })),
      };

      // Store circle data
      const circles = JSON.parse(localStorage.getItem("circles") || "[]");
      circles.push(circleData);
      localStorage.setItem("circles", JSON.stringify(circles));

      // Update user role to admin
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      user.role = "admin";
      localStorage.setItem("user", JSON.stringify(user));

      toast({
        title: "Circle created successfully!",
        description: "You are now an admin of this circle.",
      });

      navigate("/dashboard/circles");
    } catch (error) {
      toast({
        title: "Error creating circle",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container max-w-2xl mx-auto py-10">
      <Card className="p-6">
        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Create a New Circle</h1>
            <p className="text-muted-foreground">
              Set up your savings circle and invite members
            </p>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Circle Name</Label>
                <Input
                  id="name"
                  {...form.register("name")}
                  placeholder="Enter circle name"
                />
                {form.formState.errors.name && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Input
                  id="description"
                  {...form.register("description")}
                  placeholder="Describe your circle"
                />
              </div>

              <div>
                <Label htmlFor="contributionAmount">Contribution Amount</Label>
                <Input
                  id="contributionAmount"
                  type="number"
                  {...form.register("contributionAmount")}
                  placeholder="Enter amount"
                />
                {form.formState.errors.contributionAmount && (
                  <p className="text-sm text-red-500">
                    {form.formState.errors.contributionAmount.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="frequency">Contribution Frequency</Label>
                <select
                  id="frequency"
                  {...form.register("frequency")}
                  className="w-full p-2 border rounded"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Add Members</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Name"
                  value={newMember.name}
                  onChange={(e) =>
                    setNewMember({ ...newMember, name: e.target.value })
                  }
                />
                <Input
                  placeholder="Phone"
                  value={newMember.phone}
                  onChange={(e) =>
                    setNewMember({ ...newMember, phone: e.target.value })
                  }
                />
                <Button type="button" onClick={addMember}>
                  Add
                </Button>
              </div>

              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="members">
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {members.map((member, index) => (
                        <Draggable
                          key={member.id}
                          draggableId={member.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-3 bg-gray-100 rounded flex justify-between items-center"
                            >
                              <span>
                                {index + 1}. {member.name} ({member.phone})
                              </span>
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() =>
                                  setMembers(
                                    members.filter((m) => m.id !== member.id)
                                  )
                                }
                              >
                                Remove
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>

            <Button type="submit" className="w-full">
              Create Circle
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
