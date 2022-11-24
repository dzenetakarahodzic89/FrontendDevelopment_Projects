<script>
  import { each } from "svelte/internal";
  const baseURL = "http://localhost:4000";

  const tabs = ["Not Done", "Done", "All"];
  let selectedTab = 0;
  let tasks = [];
  let selectedTasks = [];
  let taskName = "";

  $: selectedTasks =
    selectedTab == 0
      ? tasks.filter((task) => task.done == false)
      : selectedTab == 1
      ? tasks.filter((task) => task.done)
      : tasks;

  function selectTab(index) {
    selectedTab = index;
  }
  function addTask() {
    fetch(`${baseURL}/api/todos`, {
      method: "POST",
      body: JSON.stringify({ text: taskName }),
      headers: new Headers({ "content-type": "application/json" }),
    })
      .then((res) => res.json())
      .then((data) => {
        tasks = data;
      })
      .catch(() => {
        alert("Error");
      });
  }
  function getTask() {
    fetch(`${baseURL}/api/todos`)
      .then((res) => res.json())
      .then((data) => {
        tasks = data;
      });
  }
  getTask();
  function doneTask(id) {
    fetch(`${baseURL}/api/todos/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        tasks = data;
      })
      .catch((err) => {
        alert("Error");
      });
  }
  function deleteTask(id) {
    fetch(`${baseURL}/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        tasks = data;
      })
      .catch((err) => {
        alert("Error");
      });
  }
</script>

<main>
  <div class="mainContainer">
    <div class="tableContainer">
      <div class="row">
        {#each tabs as tab, index}
          <button
            on:click={() => selectTab(index)}
            style="color:{selectedTab == index
              ? 'white'
              : 'red'}; background-color:{selectedTab == index
              ? 'red'
              : 'white'};
              flex:1"
          >
            {tab}
          </button>
        {/each}
      </div>
      <div style="height: 10px;" />
      <div class="row">
        <div class="tableCell name">Name</div>
        <div class="tableCell rest">Status</div>
        <div class="tableCell rest">Done</div>
        <div class="tableCell rest">Delete</div>
      </div>
      {#each selectedTasks as task}
        <div class="row">
          <div class="tableCell name">{task?.text}</div>
          <div class="tableCell rest">{task?.done ? "Done" : "Not Done"}</div>
          {#if !task.done}
            <button class="tableCell rest" on:click={() => doneTask(task._id)}
              >Change</button
            >
          {:else}
            <div class="tableCell rest">Done</div>
          {/if}
          <button class="tableCell rest" on:click={() => deleteTask(task._id)}
            >Delete</button
          >
        </div>
      {/each}
    </div>
    <div class="inputContainer">
      <p>Task Name:</p>
      <input type="text" bind:value={taskName} />
      <button on:click={addTask}>Add task</button>
    </div>
  </div>
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  .mainContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
  }
  .tableContainer {
    width: 70%;
    flex-grow: 1;
    min-height: 600px;
  }
  .inputContainer {
    width: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .label {
    text-align: center;
  }
  .input {
    border: 1px solid gray;
    border-radius: 50px;
    width: 60%;
  }
  .name {
    width: 40%;
  }
  .rest {
    width: 20%;
  }
  .tableButton {
  }
  .tableCell {
    border: 1px solid gray;
  }

  .row {
    display: flex;
    flex-direction: row;
    height: 60px;
    align-items: stretch;
  }

  p {
    max-width: 14rem;
    margin: 1rem auto;
    line-height: 1.35;
  }

  @media (min-width: 480px) {
    h1 {
      max-width: none;
    }

    p {
      max-width: none;
    }
  }
</style>
