<template>
    <div class="form-container">
        <form @submit.prevent="createPoll">
            <label>Type a poll question below</label>
            <input
                type="text"
                min="10"
                placeholder="Enter a question"
                class="poll-option"
                v-model="pollQuestion"
                required
            >
            <label>Enter as many poll choices as you like</label>
            <div class="options-container" id="optionsContainer">
                <input 
                    v-for="(option, index) in pollOptions"
                    :key="index"
                    v-model="pollOptions[index]"
                    type="text"
                    :placeholder="'Option ' + (index + 1)"
                    class="poll-option"
                    required          
                >
            </div>
            <div class="buttons">
                <button type="submit" class="btn btn-create">Create this poll</button>
                <button type="button" @click="addOption" class="btn btn-add">Add another option</button>
            </div>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";

export default {
    name: 'PollsHome',
    setup() {
        const pollQuestion = ref("");
        const pollOptions = ref(["", "", ""]);
        const router = useRouter();

        function addOption() {
            pollOptions.value.push("");
        }

        async function createPoll() {
            const newPoll = {
                question: pollQuestion.value,
                options: pollOptions.value.map(option => ({ name: option, votes: 0 }))
            };

                const response = await fetch("http://localhost:5000/polls", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPoll)
                });

                const poll = await response.json();
                router.push(`/result/${poll.id}`);

        }

        return {
            pollQuestion,
            pollOptions,
            addOption,
            createPoll
        };
    }
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    margin-left: 100vh;
    margin-top: 10vh;
    width: 80vh;
    background-color: rgb(0, 0, 0, 0.9);
    padding: 4vh;
    border-radius: 2vh;
}

label {
    margin-top: 2vh;
    margin-bottom: 2vh;
    text-align: start;
    color: white;
    font-weight: bold;
    font-size: 3.5vh;
}

.poll-option {
    color: white;
    background-color: black;
    border-radius: 1vh;
    margin-top: 1vh;
    padding: 2vh;
    font-weight: bold;
    font-size: 2vh;
}

.btn {
    width: 26vh;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: 0.3s;
    margin: 0 5px;
    text-decoration: none;
    font-weight: bold;
}

.btn-create {
    background: #472C74;
    color: white;
}

.btn-create:hover {
    background: #5A3F91;
}

.btn-add {
    background: #2b2b2b;
    color: white;
}

.btn-add:hover {
    background: #222;
}

.buttons {
    margin-top: 2vh;
    display: flex;
    justify-content: space-evenly;
    background-color: #191919;
}

.options-container {
    display: flex;
    flex-direction: column;
    max-height: 30vh;
    overflow-y: auto;
    border-radius: 1vh;
}
</style>
